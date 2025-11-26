import type {ChartConfig} from "@/components/ui/chart.tsx";

type bars = {
  key: string;
  fill: string;
}[]

type CustomChartPropType = {
  config: ChartConfig;
  data: Array<Record<string, {
    day: string;
    time: string;
  } | number>>;
  axisKey: string;
  bars: bars;
};

export type {CustomChartPropType};