
import type {IconRule} from "@/types/IconRule.ts"

type barsConfig =
  {
    key: string,
    fill: string
  }

type DashboardServicesReturn = {
  temperatureConfig: Partial<ChartConfig>;
  humidityConfig: Partial<ChartConfig>;
  windSpeedConfig: Partial<ChartConfig>;
  precipitationConfig: Partial<ChartConfig>;
  temperatureBars: barsConfig[];
  windSpeedBars: barsConfig[];
  humidityBars: barsConfig[];
  precipitationBars: barsConfig[];
  getWeatherLogs: () => Promise<object | null>;
  weather: typeof weatherSchema;
  setWeather: (weather: typeof weatherSchema) => void
  weatherTable: Array;
  setWeatherTable: (weatherTable: Array) => void;
  response: string;
  setResponse: (response: string) => void;
  temperatureIcons: IconRule[];
  humidityIcons: IconRule[];
  getIcon: (num: number, icons: IconRule[]) => JSX.Element | null;
  getColor: (num: number, icons: IconRule[]) =>  string | undefined ;
}

export type {DashboardServicesReturn}