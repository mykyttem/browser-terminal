package main

import (
    "log"
    "github.com/gin-gonic/gin"
    "commands_module/lib"
    "commands_module/commands"
)

func main() {
    // init connect to Redis
    if err := lib.InitRedis(); err != nil {
        log.Fatalf("Error initializing Redis: %v", err)
    }

    // load commands з JSON
    if err := commands.LoadCommands("./commands/commands_files.json"); err != nil {
        log.Fatalf("Failed to load commands: %v", err)
    }

    // init router
    router := gin.Default()
    lib.RegisterRoutes(router)

    log.Println("Server is running on http://localhost:8080")
    router.Run("localhost:8080")
}