import json
import pika

def send_weather_data(data: dict):
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(
            host="rabbitmq",
            port=5672,
            credentials=pika.PlainCredentials("admin", "admin")
        )
    )


    channel = connection.channel()

    channel.queue_declare(queue='weather_queue', durable=True)

    message = json.dumps(data)

    channel.basic_publish(
        exchange='',
        routing_key='weather_queue',
        body=message.encode(),
        properties=pika.BasicProperties(
            delivery_mode=2 
        )
    )

    print("Python → Fila: enviado!")

    connection.close()

