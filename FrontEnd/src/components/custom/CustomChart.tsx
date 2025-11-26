import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart.tsx";
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts";
import type {CustomChartPropType} from "@/types/CustomChartPropType.ts";

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
  return (
    <ChartContainer config={config} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
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