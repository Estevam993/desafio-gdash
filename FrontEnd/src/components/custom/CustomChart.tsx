import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart.tsx";
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts";
import type {CustomChartPropType, WeatherEntry} from "@/types/CustomChartPropType.ts";

function buildTimestamp(item: WeatherEntry): number {
  const day = item.time?.day;
  const hour = item.time?.time;

  if (!day || !hour) return 0;

  const [d, m, y] = day.split("/").map(Number);
  const [hh, mm] = hour.split(":").map(Number);

  return new Date(y, m - 1, d, hh, mm).getTime();
}

function normalizeConfig(config: Partial<ChartConfig>): ChartConfig {
  const defaultConfig: ChartConfig = {
    default: {
      label: "",
      icon: undefined,
      theme: {
        light: "#cccccc",
        dark: "#444444",
      }
    }
  }

  const cleanEntries = Object.entries(config).filter(
    ([, v]) => v !== undefined
  );

  return Object.fromEntries([
    ...Object.entries(defaultConfig),
    ...cleanEntries
  ]) as ChartConfig;
}

/**
 * CustomChart
 *
 * @component
 *
 * @param {Object} props - Component properties.
 * @param {ChartConfig} props.config - Chart configuration object, incluindo labels e cores.
 *
 * @param {Array<Object<string, string | number>>} props.data - Dataset utilizado pelo gráfico.
 * Cada item do array representa um ponto no eixo X.
 *
 * @param {string} props.axisKey - Chave usada como eixo X (ex: "month").
 *
 * @param {Array<{ key: string, fill: string }>} props.bars - Lista de barras que o gráfico deve renderizar.
 * Cada barra possui:
 *  - key: nome da propriedade no `data` (ex: "desktop")
 *  - fill: string de cor (ex: "var(--color-desktop)")
 *
 * @example
 * const chartData = [
 *   { month: "January", desktop: 186, mobile: 80 },
 *   { month: "February", desktop: 305, mobile: 200 },
 * ];
 *
 * const chartConfig = {
 *   desktop: { label: "Desktop", color: "#2563eb" },
 *   mobile: { label: "Mobile", color: "#60a5fa" },
 * };
 *
 * const bars = [
 *   { key: "desktop", fill: "var(--color-desktop)" },
 *   { key: "mobile", fill: "var(--color-mobile)" },
 * ];
 *
 * <CustomChart
 *   data={chartData}
 *   config={chartConfig}
 *   bars={bars}
 *   axisKey="month"
 * />
 */
export default function CustomChart({config, data, axisKey, bars}: CustomChartPropType) {
  const fullConfig = normalizeConfig(config);

  const sortedData = (data as WeatherEntry[]).sort(
    (a, b) => buildTimestamp(a) - buildTimestamp(b)
  );

  return (
    <ChartContainer config={fullConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={sortedData}>
        <CartesianGrid vertical={false}/>
        <XAxis
          dataKey={axisKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => {
            if (!value) return "";
            if (typeof value === "string") return value.slice(0, 5);
            return String(value);
          }}
        />
        <ChartTooltip content={<ChartTooltipContent/>}/>
        <ChartLegend content={<ChartLegendContent/>}/>
        {bars.map((bar, i) => (
          <Bar key={i} dataKey={bar.key} fill={bar.fill} radius={4}/>
        ))}
      </BarChart>
    </ChartContainer>
  )
}