from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
import time
import signal
import sys

from send_weather_data import send_weather_data
from weather_client import fetch_weather
from WeatherData import WeatherData

def job():
    print(f"[{datetime.now()}] Executando coleta...")

    raw = fetch_weather()
    send_weather_data(raw)

    validated = WeatherData(**raw)

    print("Dados coletados:")
    print(validated.model_dump())
    print("---")  # Separador para melhor visualização

def shutdown(signum, frame):
    print("🛑 Parando producer...")
    scheduler.shutdown()
    sys.exit(0)

if __name__ == "__main__":
    print("🚀 Producer iniciado...")
    
    # Configura graceful shutdown
    signal.signal(signal.SIGTERM, shutdown)
    signal.signal(signal.SIGINT, shutdown)
    
    # Executa imediatamente
    job()
    
    # Configura o scheduler
    scheduler = BackgroundScheduler()
    scheduler.add_job(job, "interval", minutes=30)
    scheduler.start()

    print("✅ Agendador iniciado - Executando a cada 30 minutos")
    print("📝 Logs serão mostrados a cada execução...")

    # Mantém o processo vivo com heartbeats
    try:
        counter = 0
        while True:
            counter += 1
            if counter % 30 == 0:  # A cada 30 segundos
                print(f"❤️  Producer ativo - Aguardando próxima execução...")
            time.sleep(1)
    except KeyboardInterrupt:
        shutdown(None, None)