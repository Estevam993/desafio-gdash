package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/go-resty/resty/v2"
	amqp "github.com/rabbitmq/amqp091-go"
)

type WeatherData struct {
	Temperature float64 `json:"temperature"`
	Humidity    float64 `json:"humidity"`
	Wind        float64 `json:"wind"`
	Condition   string  `json:"condition"`
}

type WeatherPayload struct {
	Temperature              float64 `json:"temperature"`
	Humidity                 float64 `json:"humidity"`
	WindSpeed                float64 `json:"wind_speed"`
	PrecipitationProbability float64 `json:"precipitation_probability"`
	Timestamp                string  `json:"timestamp"`
}

func main() {
	rabbitURL := getEnv("RABBITMQ_URL", "amqp://guest:guest@localhost:5672/")
	nestAPI := getEnv("NEST_API_URL", "http://backend:3000/")

	fmt.Println("📡 Conectando ao RabbitMQ...")

	conn, err := amqp.Dial(rabbitURL)

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

	client := resty.New()
	fmt.Println("🚀 Worker iniciado. Aguardando mensagens...")

	for msg := range msgs {
		fmt.Println("\n📩 Mensagem recebida")
		fmt.Println("→ Enviando para:", nestAPI+"weather/logs")

		var payload WeatherPayload
		if err := json.Unmarshal(msg.Body, &payload); err != nil {
			log.Println("❌ Erro ao deserializar JSON:", err)
			msg.Nack(false, false)
			continue
		}
		fmt.Println("→ Payload:", payload)

		resp, err := client.R().
			SetHeader("Content-Type", "application/json").
			SetBody(payload).
			Post(nestAPI + "weather/logs")

		if err != nil {
			log.Println("❌ Falha ao enviar para API:", err)
			msg.Nack(false, true)
			continue
		}

		if resp.StatusCode() >= 400 {
			log.Println("⚠️ API respondeu erro:", resp.Status())
			msg.Nack(false, true)
			continue
		}

		fmt.Println("✅ Mensagem enviada com sucesso!")
		msg.Ack(false)
	}

}
func getEnv(key, fallback string) string {
	v := os.Getenv(key)
	if v == "" {
		return fallback
	}
	return v
}
