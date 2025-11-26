from apscheduler.schedulers.blocking import BlockingScheduler
from datetime import datetime

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



if __name__ == "__main__":
    scheduler = BlockingScheduler()

    scheduler.add_job(job, "interval", seconds=120)

    print("Producer iniciado... (Ctrl + C para parar)")
    scheduler.start()
