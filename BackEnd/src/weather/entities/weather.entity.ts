import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Weather {
  @Prop({ default: uuidv4})
  id: string;

  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  humidity: number;

  @Prop({ required: true })
  wind_speed: number;

  @Prop({ required: true })
  precipitation_probability: number;

  @Prop({ required: true })
  timestamp: string
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);