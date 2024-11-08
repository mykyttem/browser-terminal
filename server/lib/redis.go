package lib

import (
    "context"
    "fmt"
    "log"
    "github.com/redis/go-redis/v9"
)

var redisClient *redis.Client
var ctx = context.Background()

// initRedis ініціалізує connect with Redis
func InitRedis() error {
    redisClient = redis.NewClient(&redis.Options{
        Addr:     "localhost:6379",
        Password: "",
        DB:       0,
    })

    // Перевірка з'єднання
    _, err := redisClient.Ping(ctx).Result()
    if err != nil {
        return fmt.Errorf("failed to connect to Redis: %v", err)
    }

    log.Println("Successfully connected to Redis")
    return nil
}