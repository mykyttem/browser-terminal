package commands

import (
    "encoding/json"
    "io/ioutil"
    "net/http"
    "os"
    "os/exec"
    "strings"
    "github.com/gin-gonic/gin"
)

type CommandRequest struct {
    Command string `json:"command"`
}

type CommandResponse struct {
    Output string `json:"output"`
}

type Command struct {
    Name        string `json:"name"`
    Description string `json:"description"`
}

var allowedCommands = make(map[string]Command)

func LoadCommands(filename string) error {
    file, err := os.Open(filename)
    if err != nil {
        return err
    }
    defer file.Close()

    byteValue, _ := ioutil.ReadAll(file)
    var commandsList struct {
        Commands []Command `json:"commands"`
    }
    if err := json.Unmarshal(byteValue, &commandsList); err != nil {
        return err
    }

    // save commands in map
    for _, cmd := range commandsList.Commands {
        allowedCommands[cmd.Name] = cmd
    }
    return nil
}

// Exported functions, starting with uppercase
func GetCommands(c *gin.Context) {
    commands := make([]Command, 0, len(allowedCommands))
    for _, cmd := range allowedCommands {
        commands = append(commands, cmd)
    }
    c.JSON(http.StatusOK, gin.H{"commands": commands})
}

func ExecuteCommand(c *gin.Context) {
    var cmdReq CommandRequest
    if err := c.BindJSON(&cmdReq); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
        return
    }

    args := strings.Fields(cmdReq.Command)
    if len(args) == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Empty command"})
        return
    }

    if _, allowed := allowedCommands[args[0]]; !allowed {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Command not allowed"})
        return
    }

    cmd := exec.Command(args[0], args[1:]...)
    output, err := cmd.CombinedOutput()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"output": string(output), "error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, CommandResponse{Output: string(output)})
}