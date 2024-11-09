package lib

import (
	"github.com/docker/docker/client"
	"log"
)

// NewDockerClient створює та повертає новий Docker клієнт.
func NewDockerClient() (*client.Client, error) {
	cli, err := client.NewClientWithOpts(client.WithVersion("1.41"))
	if err != nil {
		log.Println("Error creating Docker client:", err)
		return nil, err
	}
	return cli, nil
}