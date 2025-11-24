import os
from dotenv import load_dotenv

load_dotenv()

QUEUE_NAME = os.getenv("QUEUE_NAME", "weather_queue")

LAT = float(os.getenv("CITY_LAT", "-23.5559617"))
LON = float(os.getenv("CITY_LON", "-46.6360973"))
