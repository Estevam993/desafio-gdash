import {CustomChart, CustomDataTable} from "@/components/custom";
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
import {useEffect} from "react";
import DashboardHeaders from "../components/dashboard/DashboardHeaders.tsx";

export default function Dashboard() {
  const {
    temperatureConfig,
    temperatureBars,
    windSpeedConfig,
    windSpeedBars,
    humidityConfig,
    humidityBars,
    precipitationConfig,
    precipitationBars,
    getWeatherLogs,
    weather,
    setWeather,
    response,
    setResponse,
    weatherTable,
    setWeatherTable,
    columns
  } = useDashboardServices()


  useEffect(() => {
    const getWeather = async () => {
      const weather = await getWeatherLogs()

      if (!!weather && weather.code_status === "success") {
        setWeatherTable(weather.formatedWeatherTable)
        setWeather(weather.formatedWeatherLog)
        setResponse(weather.response)
      }
    }
    getWeather()
  }, [])

  return (
    <div className="w-full h-full flex flex-col gap-4 ">
      <DashboardHeaders/>

      <div className={'grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4'}>
        <Card>
          <CustomChart
            data={weather.temperature}
            config={temperatureConfig}
            bars={temperatureBars}
            axisKey={'time.time'}
          />
        </Card>
        <Card>
          <CustomChart
            data={weather.windSpeed}
            config={windSpeedConfig}
            bars={windSpeedBars}
            axisKey={'time.time'}
          />
        </Card>
        <Card>
          <CustomChart
            data={weather.humidity}
            config={humidityConfig}
            bars={humidityBars}
            axisKey={'time.time'}
          />
        </Card>
        <Card>
          <CustomChart
            data={weather.precipitation}
            config={precipitationConfig}
            bars={precipitationBars}
            axisKey={'time.time'}
          />
        </Card>
      </div>
      <div className={"overflow-auto"}>
        {weatherTable && weatherTable.length > 0 && (
          <CustomDataTable columns={columns} data={weatherTable}/>
        )}
      </div>
      <Drawer>
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
          <div className={'p-8 overflow-auto '}>

            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        </DrawerContent>

      </Drawer>
    </div>
  )
}
