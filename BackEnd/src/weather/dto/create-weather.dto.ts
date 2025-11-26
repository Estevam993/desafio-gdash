import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateWeatherDto {
  @IsNotEmpty()
  @IsNumber()
  temperature: number;

  @IsNotEmpty()
  @IsNumber()
  humidity: number;

  @IsNotEmpty()
  @IsNumber()
  wind_speed: number;

  @IsNotEmpty()
  @IsNumber()
  precipitation_probability: number;

  @IsNotEmpty()
  @IsString()
  timestamp: string
}

