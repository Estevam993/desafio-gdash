import {Injectable} from '@nestjs/common';
import {CreateWeatherDto} from './dto/create-weather.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Weather} from "./entities/weather.entity";
import {Model} from "mongoose";
import {IaService} from "../ia/ia.service";
import createWeatherReturnType from "./types/createWeatherReturnType";
import getLastWeatherLogReturnType from "./types/getLastWeatherLogReturnType";

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

      const prompt: string = "Faça uma análise meteorológica do seguinte clima:" + JSON.stringify(lastWeatherLog)

      const response = await this.iaService.generateResponse(prompt);

      return {lastWeatherLog, response, code_status: 'success'};
    } catch (error) {
      const message = error instanceof Error ? error.message : error;
      return {
        code_status: 'error',
        message
      }
    }
  }
}
