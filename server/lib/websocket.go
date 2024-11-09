package lib

import (
	"context"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/gorilla/websocket"
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

	for {
		// reading a command from a WebSocket
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			return
		}
		log.Println("Received command:", string(msg))

		// creating an exec request to execute a command in a container
		execResp, err := cli.ContainerExecCreate(context.Background(), containerID, types.ExecConfig{
			Cmd:          []string{"sh", "-c", string(msg)},
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

		// sending the result of execution to a WebSocket
		err = conn.WriteMessage(websocket.TextMessage, output)
		if err != nil {
			log.Println("Error sending message:", err)
			return
		}
	}
}