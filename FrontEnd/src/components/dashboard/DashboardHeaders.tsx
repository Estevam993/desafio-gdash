import {useDashboardServices} from "@/services";
import {useEffect, useState} from "react";
import {IconMoonFilled, IconSunFilled,} from "@tabler/icons-react";
import {CustomCardDashboard} from "@/components/custom";

export default function DashboardHeaders() {
  // Hooks
  const [isDay, setIsDay] = useState<boolean>(true);
  const {
    getWeatherLogs,
    weather,
    setWeather,
    setResponse,
    temperatureIcons,
    humidityIcons,
    isDayIcons,
    getIcon,
  } = useDashboardServices()

  // Effects
  useEffect(() => {
    const getWeather = async () => {
      const weather = await getWeatherLogs()

      if (weather && weather.code_status === "success") {
        setWeather(weather.formatedWeatherLog)
        setResponse(weather.response)
      }
    }

    getWeather()
  }, [getWeatherLogs, setResponse, setWeather])

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      setIsDay(hour >= 6 && hour < 18);
    };

    checkTime();

    const interval = setInterval(checkTime, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={"grid lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 overflow-auto gap-4 w-full"}>
      <CustomCardDashboard
        title={"Hora do ultimo Registro"}
        text={`${weather.actualRegisterHour.day} ${weather.actualRegisterHour.time}`}
      />

      <CustomCardDashboard
        title="Temperatura atual"
        className={"text-white"}
        text={`${weather.actualTemperature} º`}
        icon={getIcon(weather.actualTemperature, temperatureIcons)}
      />

      <CustomCardDashboard
        title={"Humidade atual"}
        className={"text-white"}
        text={`${weather.actualHumidity} %`}
        icon={getIcon(weather.actualHumidity, humidityIcons)}
      />

      <CustomCardDashboard
        className={"p-0 flex justify-center items-center text-white"}
        icon={getIcon(isDay, isDayIcons)}
        text={
          isDay ? <IconSunFilled color={"yellow"} size={"7rem"}/> : <IconMoonFilled color={"white"} size={"7rem"}/>
        }
      />
    </div>
  )
}