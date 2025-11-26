import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {User, UserSchema} from "./entities/user.entity";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "./auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
    ]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
}
