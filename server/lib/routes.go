package lib

import (
    "github.com/gin-gonic/gin"
    "commands_module/commands"
)

func RegisterRoutes(router *gin.Engine) {
    router.POST("/execute", commands.ExecuteCommand)
    router.GET("/commands", commands.GetCommands)
}