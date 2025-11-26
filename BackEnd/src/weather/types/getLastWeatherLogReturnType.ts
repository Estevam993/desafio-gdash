import {Weather} from "../entities/weather.entity";

type getLastWeatherLogReturnType = {
  lastWeatherLog?: Weather[];
  response?: string;
  code_status: 'success' | 'error';
  message?: string;
}

export default getLastWeatherLogReturnType;