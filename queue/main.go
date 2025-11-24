package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	amqp "github.com/rabbitmq/amqp091-go"
)

type WeatherData struct {
	Temperature float64 `json:"temperature"`
	Humidity    float64 `json:"humidity"`
	Wind        float64 `json:"wind"`
	Condition   string  `json:"condition"`
}

func main() {
	conn, err := amqp.Dial(os.Getenv("RABBITMQ_URL"))

	if err != nil {
		panic(err)
	}

	defer conn.Close()

	ch, _ := conn.Channel()
	defer ch.Close()

	msgs, _ := ch.Consume(
		"weather_queue",
		"",
		false,
		false,
		false,
		false,
		nil,
	)

	for msg := range msgs {
		var data WeatherData
		_ = json.Unmarshal(msg.Body, &data)

		fmt.Println("Go → Mensagem recebida:", data)

		msg.Ack(false)

		jsonBody, err := json.Marshal(data)
		if err != nil {
			panic(err)
		}

		resp, err := http.Post(
			os.Getenv("NESTJS_URL")+"weather/logs",
			"application/json",
			bytes.NewBuffer(jsonBody),
		)
		if err != nil {
			panic(err)
		}
		defer resp.Body.Close()

		fmt.Println("Status:", resp.Status)
	}

}
