import {Injectable} from '@nestjs/common';
import {CreateWeatherDto} from './dto/create-weather.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Weather} from "./entities/weather.entity";
import {Model} from "mongoose";
import {IaService} from "../ia/ia.service";
import createWeatherReturnType from "./types/createWeatherReturnType";
import {
  FormatedWeatherTable,
  FormattedWeatherLogReturnType,
  getLastWeatherLogReturnType
} from "./types/getLastWeatherLogReturnType";

@Injectable()
export class WeatherService {

  constructor(
    @InjectModel(Weather.name)
    private readonly weatherModel: Model<Weather>,
    private readonly iaService: IaService
  ) {
  }

  async create(createWeatherDto: CreateWeatherDto): Promise<createWeatherReturnType> {
    try {
      const createWeatherLog = new this.weatherModel(createWeatherDto);

      await createWeatherLog.save();

      return {
        weather_log: createWeatherLog,
        code_status: 'success',
        message: `Tempo registrado com sucesso!`,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : error;

      return {
        code_status: 'error',
        message
      }
    }
  }

  async getLastWeatherLog(): Promise<getLastWeatherLogReturnType> {
    try {
      const lastWeatherLog = await this.weatherModel
        .find()
        .sort({timestamp: -1})
        .limit(20)
        .exec();

      if (lastWeatherLog.length == 0)
        return {
          code_status: 'error',
          message: "Nenhum dado sobre o clima foi encontrado"
        }

      const prompt: string = "Faça uma análise meteorológicade são paulo, em que usuarios que apenas querem saber o que devem utilizar de vestimenta, e o que fazer no dia (não é necessario fornecer dados exatos sobre o clima, apenas a análise) : " + JSON.stringify(lastWeatherLog)

      const response = await this.getIaMessage(prompt);
      const formatedWeatherLog = this.formatWeatherLog(lastWeatherLog);

      const formatedWeatherTable = this.formatWeatherTable(lastWeatherLog);
      return {formatedWeatherLog, formatedWeatherTable, response, code_status: 'success'};
    } catch (error) {
      const message = error instanceof Error ? error.message : error;
      return {
        code_status: 'error',
        message
      }
    }
  }

  formatWeatherLog(weather: Weather[]): FormattedWeatherLogReturnType {
    const temperature = weather.map(w => ({
      temperature: Math.round(w.temperature),
      time: this.formatDate(w.timestamp)
    }));
    const humidity = weather.map(w => ({
      humidity: Math.round(w.humidity),
      time: this.formatDate(w.timestamp)
    }));
    const windSpeed = weather.map(w => ({
      wind_speed: Math.round(w.wind_speed),
      time: this.formatDate(w.timestamp)
    }));
    const precipitation = weather.map(w => ({
      precipitation: Math.round(w.precipitation_probability * 100),
      time: this.formatDate(w.timestamp)
    }));

    const actualTemperature = weather.length > 0
      ? Math.round(weather[weather.length - 1].temperature)
      : null;

    const actualHumidity = weather.length > 0
      ? Math.round(weather[weather.length - 1].humidity)
      : null;

    const actualRegisterHour = weather.length > 0
      ? this.formatDate(weather[0].timestamp)
      : null;

    return {
      temperature,
      humidity,
      precipitation,
      windSpeed,
      actualTemperature,
      actualHumidity,
      actualRegisterHour,
    }
  }

  formatWeatherTable(weather: Weather[]): FormatedWeatherTable[] {
    return weather.map(w => ({
      temperature: Math.round(w.temperature) + " º",
      humidity: Math.round(w.humidity) + " %",
      precipitation: Math.round(w.precipitation_probability * 100) + " %",
      windSpeed: Math.round(w.wind_speed) + " km/h",
      time: this.formatDate(w.timestamp).day + " " + this.formatDate(w.timestamp).time,
    }))
  }

  formatDate(raw) {
    const normalized = raw.replace(/\.\d{6}/, m => "." + m.slice(1, 4));
    const date = new Date(normalized);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return {
      day: `${day}/${month}/${year}`, time: `${hours}:${minutes}`
    };
  }

  async getIaMessage(prompt: string): Promise<string> {
    try {
      return await this.iaService.generateResponse(prompt);
    } catch {
      return "Erro ao se comunicar com Groq"
    }
  }
}
