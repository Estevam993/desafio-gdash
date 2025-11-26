import {CustomChart} from "@/components/custom";
import {Card} from "@/components/ui/card.tsx";
import ReactMarkdown from "react-markdown";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer.tsx";
import {Button} from "@/components/ui/button.tsx";
import useDashboardServices from "../services/useDashboardServices.tsx";
import {useEffect, useState} from "react";

const weatherSchema = {
  temperature: [{
    temperature: 0,
    time: {
      day: "",
      time: ""
    }
  }],
  humidity: [{
    humidity: 0,
    time: {
      day: "",
      time: ""
    }
  }],
  precipitation: [{
    precipitation: 0,
    time: {
      day: "",
      time: ""
    }
  }],
  windSpeed: [{
    wind_speed: 0,
    time: {
      day: "",
      time: ""
    }
  }],
}

export default function Dashboard() {
  const [weather, setWeather] = useState(weatherSchema)
  const [response, setResponse] = useState('')

  const {
    temperatureConfig,
    temperatureBars,
    windSpeedConfig,
    windSpeedBars,
    humidityConfig,
    humidityBars,
    precipitationConfig,
    precipitationBars,
    getWeatherLogs
  } = useDashboardServices()


  useEffect(() => {
    const getWeather = async () => {
      const weather = await getWeatherLogs()

      if (weather && weather.code_status === "success") {
        setWeather(weather.formatedWeatherLog)
        setResponse(weather.response)
      }

    }

    getWeather()
  }, [])


  return (
    <Drawer>
      <Card className={"h-full grid grid-cols-2 p-4"}>
        <CustomChart
          data={weather.temperature}
          config={temperatureConfig}
          bars={temperatureBars}
          axisKey={'time.time'}
        />
        <CustomChart
          data={weather.windSpeed}
          config={windSpeedConfig}
          bars={windSpeedBars}
          axisKey={'time.time'}
        />
        <CustomChart
          data={weather.humidity}
          config={humidityConfig}
          bars={humidityBars}
          axisKey={'time.time'}
        />
        <CustomChart
          data={weather.precipitation}
          config={precipitationConfig}
          bars={precipitationBars}
          axisKey={'time.time'}
        />

      </Card>
      <div className={'w-full flex items-center justify-center mt-4'}>
        <DrawerTrigger asChild>
          <Button className={'max-w-96'}>
            Ver Analise por IA
          </Button>
        </DrawerTrigger>
      </div>

      <DrawerContent>
        <DrawerHeader>

          <DrawerTitle>Análise por IA</DrawerTitle>
          <DrawerDescription>Análise feita pelo modelo llama-3.1-8b-instant</DrawerDescription>

        </DrawerHeader>
        <div className={'p-8'}>

          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      </DrawerContent>

    </Drawer>
  )
}
