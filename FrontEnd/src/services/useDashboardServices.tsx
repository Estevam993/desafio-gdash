import type {ChartConfig} from "@/components/ui/chart.tsx";
import {getRequest} from "@/utils/http.ts";
import {useToast} from "@/services/index.ts";
import getBackEndUrl from "@/services/getBackEndUrl.ts";
import {useState} from "react";
import {type ColumnDef} from "@tanstack/react-table";

import {
  IconCloudBolt,
  IconSnowflake,
  IconSunFilled,
  IconTree,
  IconUmbrellaFilled,
  IconUmbrellaOff
} from "@tabler/icons-react";
import type {IconRule} from "@/types/IconRule.ts"
import type {DashboardServicesReturn} from "@/types/DashboardTypes.ts"
import weatherLogSchema from "@/schemas/weatherLogSchema.ts";

// Functions
const getIcon = (num: number, icons: IconRule[]) => {
  const item = icons.find(rule => rule.match(num));
  return item?.icon ?? null;
};

const getColor = (num: number, icons: IconRule[]) => {
  const item = icons.find(rule => rule.match(num));
  return item?.color ?? '#fff';
}

// Constants
const apiUrl = getBackEndUrl()

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

const temperatureIcons: IconRule[] = [
  {
    icon: <IconSunFilled/>,
    color: "#deab63",
    match: (temp: number) => temp >= 24,
  },
  {
    icon: <IconSnowflake/>,
    color: "#90dafa",
    match: (temp: number) => temp <= 14,
  },
  {
    icon: <IconTree/>,
    color: "#90faa2",
    match: (temp: number) => temp > 14 && temp < 24,
  }
];

const humidityIcons: IconRule[] = [
  {
    icon: <IconCloudBolt/>,
    color: "#8d8d8d",
    match: (hum: number) => hum >= 75,
  },
  {
    icon: <IconUmbrellaFilled/>,
    color: "#8aacbd",
    match: (hum: number) => hum >= 25,
  },
  {
    icon: <IconUmbrellaOff/>,
    color: "#ffffff",
    match: (hum: number) => hum < 25,
  },
]


const columns: ColumnDef[] = [
  {
    accessorKey: "time",
    header: "Hora",
  },
  {
    accessorKey: "temperature",
    header: "Temperatura",
  },
  {
    accessorKey: "humidity",
    header: "Humidade",
  },
  {
    accessorKey: "windSpeed",
    header: "Velocidade do Vento",
  },
  {
    accessorKey: "precipitation",
    header: "Chance de Precipitação",
  },
]

export default function useDashboardServices(): DashboardServicesReturn {
  // Hooks
  const [weather, setWeather] = useState(weatherLogSchema)
  const [weatherTable, setWeatherTable] = useState([])
  const [response, setResponse] = useState('')
  const {showToast} = useToast()

  // Functions
  const getWeatherLogs = async () => {
    try {
      const response = await getRequest({
        url: apiUrl + 'weather',
      })

      if (response.code_status === 'error')
        showToast(
          'Erro ao obter informações sobre o clima.',
          'error'
        )
      else return response

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
    windSpeedConfig,
    humidityConfig,
    precipitationConfig,
    windSpeedBars,
    humidityBars,
    temperatureBars,
    precipitationBars,
    getWeatherLogs,
    weather,
    setWeather,
    response,
    setResponse,
    temperatureIcons,
    humidityIcons,
    getIcon,
    getColor,
    weatherTable,
    setWeatherTable,
    columns
  }
}