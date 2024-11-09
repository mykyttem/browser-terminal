package main

import (
	"log"
	"net/http"
	"commands_module/lib"
)

func main() {
	// create a Docker client
	cli, err := lib.NewDockerClient()
	if err != nil {
		log.Fatal("Failed to create Docker client:", err)
	}

	// websocket
	http.HandleFunc("/ws", func(w http.ResponseWriter, req *http.Request) {
		lib.ServeWebSocket(w, req, cli)
	})

	log.Println("WebSocket server started at ws://localhost:8080/ws")
	log.Fatal(http.ListenAndServe(":8080", nil))
}