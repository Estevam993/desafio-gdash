import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import {JwtAuthGuard} from "../user/jwt-auth.guard";

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post('logs')
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.create(createWeatherDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.weatherService.getLastWeatherLog();
  }
}
