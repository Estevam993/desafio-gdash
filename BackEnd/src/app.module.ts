import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {UserModule} from './user/user.module';
import {WeatherModule} from './weather/weather.module';
import {IaModule} from './ia/ia.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const isDocker = process.env.DOCKER_ENV === 'true';
        const mongoHost = isDocker ? 'mongo' : 'localhost';
        const mongoUrl = `mongodb://admin:senha123@${mongoHost}:27017/desafio-gdash?authSource=admin`;

        console.log(`🔄 Connecting to MongoDB at: ${mongoHost}`);

        return {
          uri: mongoUrl,
          retryAttempts: 5,
          retryDelay: 3000,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    WeatherModule,
    IaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
