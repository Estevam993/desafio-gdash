from pydantic import BaseModel

class WeatherData(BaseModel):
    temperature: float
    humidity: float
    wind_speed: float
    rain_probability: float
    timestamp: str
