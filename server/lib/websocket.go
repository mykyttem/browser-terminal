package lib

import (
	"context"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/gorilla/websocket"
	"strings"
)

// handles WebSocket connections and interacts with the Docker container.
func ServeWebSocket(w http.ResponseWriter, req *http.Request, cli *client.Client) {
	upgrader := websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool { return true },
	}

	conn, err := upgrader.Upgrade(w, req, nil)
	if err != nil {
		log.Println("Error upgrading to WebSocket:", err)
		return
	}
	defer conn.Close()

	// specify the container with which we will interact
	containerID := "f92d29aa1c12"
	currentDir := "/"

	for {
		// reading a command from a WebSocket
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			return
		}
		command := string(msg)
		log.Println("Received command:", command)

		// formation of a complete team
		fullCommand := "cd " + currentDir + " && " + command + " && pwd"

		// executing a command in a container
		execResp, err := cli.ContainerExecCreate(context.Background(), containerID, types.ExecConfig{
			Cmd:          []string{"sh", "-c", fullCommand},
			Tty:          true,
			AttachStdout: true,
			AttachStderr: true,
		})
		if err != nil {
			log.Println("Error creating exec instance:", err)
			return
		}

		// execution of the command
		resp, err := cli.ContainerExecAttach(context.Background(), execResp.ID, types.ExecStartCheck{
			Tty: true,
		})
		if err != nil {
			log.Println("Error attaching to exec instance:", err)
			return
		}
		defer resp.Close()

		// reading command output and sending it to a WebSocket
		output, err := ioutil.ReadAll(resp.Reader)
		if err != nil {
			log.Println("Error reading exec output:", err)
			return
		}

		outputStr := string(output)
		lines := strings.Split(outputStr, "\n")
		if len(lines) > 0 {
			// the last line contains the new directory after the `pwd` command
			currentDir = lines[len(lines)-2]
		}

		// sending the current directory and command output
		err = conn.WriteMessage(websocket.TextMessage, []byte(currentDir+"\n"+outputStr))
		if err != nil {
			log.Println("Error sending message:", err)
			return
		}
	}
}