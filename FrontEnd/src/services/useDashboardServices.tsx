import type {ChartConfig} from "@/components/ui/chart.tsx";
import {getRequest} from "@/utils/http.ts";
import {useToast} from "@/services/index.ts";

const apiUrl = import.meta.env.VITE_NEST_API_URL;

const temperatureConfig = {
  temperature: {
    label: "temperatura",
    color: "#2563eb",
  },
} satisfies ChartConfig

const temperatureBars = [
  {
    key: "temperature",
    fill: "var(--color-temperature)"
  }
]

const windSpeedConfig = {
  wind_speed: {
    label: "Velocidade do vento",
    color: "#d28ae1",
  },
} satisfies ChartConfig

const windSpeedBars = [
  {
    key: "wind_speed",
    fill: "var(--color-wind_speed)"
  }
]

const humidityConfig = {
  humidity: {
    label: "Humidade",
    color: "#8ae1a3",
  },
} satisfies ChartConfig

const humidityBars = [
  {
    key: "humidity",
    fill: "var(--color-humidity)"
  }
]

const precipitationConfig = {
  precipitation: {
    label: "Precipitação",
    color: "#e19e8a",
  },
} satisfies ChartConfig

const precipitationBars = [
  {
    key: "precipitation",
    fill: "var(--color-precipitation)"
  }
]

export default function useDashboardServices() {
  const {showToast} = useToast()

  const getWeatherLogs = async () => {
    try {
      return await getRequest({
        url: apiUrl + 'weather',
      })

    } catch (error) {
      showToast(
        'Erro ao obter informações sobre o clima.',
        'error',
        {description: error instanceof Error ? error.message : "Erro desconhecido."}
      )
      return null
    }
  }


  return {
    temperatureConfig,
    temperatureBars,
    windSpeedConfig,
    windSpeedBars,
    humidityConfig,
    humidityBars,
    precipitationConfig,
    precipitationBars,
    getWeatherLogs
  }
}