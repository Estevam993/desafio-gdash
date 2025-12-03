import type {ChartConfig} from "@/components/ui/chart.tsx";

type bars = {
  key: string;
  fill: string;
}[]

type TimeInfo = {
  day: string;
  time: string;
};

type CustomChartPropType = {
  config: Partial<ChartConfig>;
  data: Array<Record<string, number | TimeInfo>>;
  axisKey: string;
  bars: bars;
};

type WeatherEntry = {
  time: TimeInfo;
} & Record<string, number>;

export type {CustomChartPropType, WeatherEntry};