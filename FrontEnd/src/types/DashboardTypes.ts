import type {Dispatch, SetStateAction} from "react";
import type {IconRule} from "@/types/IconRule.ts"
import type {ChartConfig} from "@/components/ui/chart.tsx";
import {weatherLogSchema} from "@/schemas"
import type {ColumnDef} from "@tanstack/react-table";

type barsConfig =
  {
    key: string,
    fill: string
  }

type FormatedWeatherTable = {
  id: string;
  temperature: string;
  humidity: string;
  windSpeed: string;
  precipitation: string;
  time: string
}

type WeatherPromise = {
  code_status: "success" | "error";
  formatedWeatherLog: typeof weatherLogSchema;
  response: string;
  formatedWeatherTable: FormatedWeatherTable[];
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
  getWeatherLogs: () => Promise<WeatherPromise | null>;
  weather: typeof weatherLogSchema;
  setWeather: (weather: typeof weatherLogSchema) => void
  weatherTable: FormatedWeatherTable[];
  setWeatherTable: Dispatch<SetStateAction<FormatedWeatherTable[]>>;
  response: string;
  setResponse: (response: string) => void;
  temperatureIcons: IconRule<number>[];
  humidityIcons: IconRule<number>[];
  isDayIcons: IconRule<boolean>[];
  getIcon: <T,>(value: T, icons: IconRule<T>[]) => string | null;
  columns: ColumnDef<FormatedWeatherTable>[]
}

export type {DashboardServicesReturn, FormatedWeatherTable}