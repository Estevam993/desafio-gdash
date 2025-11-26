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
};

type getLastWeatherLogReturnType = {
  formatedWeatherLog?: FormattedWeatherLogReturnType;
  response?: string;
  code_status: 'success' | 'error';
  message?: string;
}

export type {getLastWeatherLogReturnType, FormattedWeatherLogReturnType};