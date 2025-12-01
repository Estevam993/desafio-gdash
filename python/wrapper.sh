#!/bin/bash
echo "🚀 Iniciando Python Producer..."
echo "📅 Agendador configurado para executar a cada 1 minuto"

# Loop infinito SEMPRE - mesmo se producer terminar com sucesso
while true; do
    echo "📝 [$(date)] Executando Python producer..."
    python producer.py
    EXIT_CODE=$?
    echo "🔧 Producer terminou com código: $EXIT_CODE - Reiniciando em 2 segundos..."
    sleep 2
done