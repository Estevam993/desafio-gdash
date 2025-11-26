import {Injectable} from '@nestjs/common';
import {CreateWeatherDto} from './dto/create-weather.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Weather} from "./entities/weather.entity";
import {Model} from "mongoose";

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name)
    private readonly weatherModel: Model<Weather>,
  ) {
  }

  async create(createWeatherDto: CreateWeatherDto) {

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

  getLastWeatherLog() {
    try{
      const lastWeatherLog = this.weatherModel.findOne();
    }catch(error){

    }
    return `This action returns all weather`;
  }
}
