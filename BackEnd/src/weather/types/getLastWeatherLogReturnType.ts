import {Weather} from "../entities/weather.entity";

type WeatherLog<K extends string> = {
  [key in K]: number;
} & { time: { day: string, time: string } };

type TemperatureLog = WeatherLog<"temperature">;
type HumidityLog = WeatherLog<"humidity">;
type WindLog = WeatherLog<"wind_speed">;
type PrecipitationLog = WeatherLog<"precipitation">;

type FormattedWeatherLogReturnType = {
  temperature: TemperatureLog[];
  humidity: HumidityLog[];
  windSpeed: WindLog[];
  precipitation: PrecipitationLog[];
  actualTemperature: number;
  actualHumidity: number;
  actualRegisterHour: { day: string, time: string };
};

type FormatedWeatherTable = {
  temperature: string;
  humidity: string;
  windSpeed: string;
  precipitation: string;
  time: string
}

type getLastWeatherLogReturnType = {
  formatedWeatherLog?: FormattedWeatherLogReturnType;
  formatedWeatherTable?: FormatedWeatherTable[];
  response?: string;
  code_status: 'success' | 'error';
  message?: string;
}

export type {getLastWeatherLogReturnType, FormattedWeatherLogReturnType, FormatedWeatherTable};