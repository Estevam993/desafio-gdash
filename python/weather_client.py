import requests_cache
from retry_requests import retry
from openmeteo_requests import Client
from datetime import datetime
import pandas as pd

from config import LAT, LON

session = requests_cache.CachedSession('.cache', expire_after=3600)

retry_session = retry(session, retries=3, backoff_factor=0.2)

client = Client(session=retry_session)

def fetch_weather():
    url = "https://api.open-meteo.com/v1/forecast"

    params = {
        "latitude": LAT,
        "longitude": LON,
        "hourly": [
            "temperature_2m", 
            "relative_humidity_2m", 
            "wind_speed_10m", 
            "precipitation_probability", 
            "is_day"
            ],
    }

    responses = client.weather_api(url, params=params)
    response = responses[0]

    hourly = response.Hourly()

    temperature = float(hourly.Variables(0).ValuesAsNumpy()[0])
    humidity = float(hourly.Variables(1).ValuesAsNumpy()[0])
    wind_speed = float(hourly.Variables(2).ValuesAsNumpy()[0])
    rain_probability = float(hourly.Variables(3).ValuesAsNumpy()[0])
    is_day = float(hourly.Variables(4).ValuesAsNumpy()[0])

    return {
        "temperature": temperature,
        "humidity": humidity,
        "wind_speed": wind_speed,
        "rain_probability": rain_probability,
        "timestamp": datetime.utcnow().isoformat(),
        "is_day": is_day
    }
