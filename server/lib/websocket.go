package lib

import (
    "context"
    "io/ioutil"
    "log"
    "net/http"
    "strings"

    "github.com/docker/docker/api/types"
    "github.com/docker/docker/client"
    "github.com/gorilla/websocket"
)

// handle WebSocket connections and interact with Docker container
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
        // read command from WebSocket
        _, msg, err := conn.ReadMessage()
        if err != nil {
            log.Println("Error reading message:", err)
            return
        }
        command := string(msg)
        log.Println("Received command:", command)

        // sanitize the command to remove unbalanced quotes or escape sequences
        command = sanitizeCommand(command)

        // execute command in container (without 'cd')
        execResp, err := cli.ContainerExecCreate(context.Background(), containerID, types.ExecConfig{
            Cmd:          []string{"sh", "-c", command}, // Execute the command directly without 'cd'
            Tty:          true,
            AttachStdout: true,
            AttachStderr: true,
        })
        if err != nil {
            log.Println("Error creating exec instance:", err)
            return
        }

        // execute the command
        resp, err := cli.ContainerExecAttach(context.Background(), execResp.ID, types.ExecStartCheck{
            Tty: true,
        })
        if err != nil {
            log.Println("Error attaching to exec instance:", err)
            return
        }
        defer resp.Close()

        // read command output and send to WebSocket
        output, err := ioutil.ReadAll(resp.Reader)
        if err != nil {
            log.Println("Error reading exec output:", err)
            return
        }

        outputStr := string(output)
        lines := strings.Split(outputStr, "\n")

        // Handle case when last line contains current directory
        if len(lines) > 0 {
            currentDir = strings.TrimSpace(lines[len(lines)-1]) // Update current directory based on the last line
        }

        // send current directory and command output to WebSocket
        err = conn.WriteMessage(websocket.TextMessage, []byte(currentDir+"\n"+outputStr))
        if err != nil {
            log.Println("Error sending message:", err)
            return
        }
    }
}

// sanitizeCommand checks for unbalanced quotes or potential issues in the command
func sanitizeCommand(command string) string {
    // replace unbalanced quotes or any problematic characters
    command = strings.Replace(command, "'", "", -1) // Remove single quotes
    command = strings.Replace(command, "\"", "", -1) // Remove double quotes
    return command
}
