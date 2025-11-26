import {CreateWeatherDto} from "../dto/create-weather.dto";

type createWeatherReturnType = {
    weather_log?: CreateWeatherDto;
    code_status: 'success' | 'error';
    message: string
}

export default createWeatherReturnType;