import {Injectable, UnauthorizedException} from '@nestjs/common';
import {compareSync} from "bcrypt";
import {User} from "./entities/user.entity";
import {InjectModel} from "@nestjs/mongoose";
import {JwtService} from '@nestjs/jwt';
import {Model} from "mongoose";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(
    email: string,
    password: string
  ) {
    const user: User | null = await this.userModel.findOne({email}).exec();

    if (user) {
      const isPasswordValid = compareSync(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Senha inválida');
      }

      return {
        email: user.email,
        id: user.id,
        name: user.name,
      };
    }

    throw new UnauthorizedException('Usuário não encontrado');
  }

  login(user): { access_token: string } {
    const payload = {
      email: user.email,
      sub: user.id,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async create(createUserDto: CreateUserDto): Promise<any> {

    try {
      const createdUser = new this.userModel(createUserDto);

      const payload = {
        sub: createdUser.id,
        email: createdUser.email,
      };

      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });

      const userReturn = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      };

      await createdUser.save();

      return {
        user: userReturn,
        access_token: accessToken,
        code_status: 'success',
        message: `Usuário ${createdUser.name} criado com sucesso!`,
      };
    } catch (err) {
      return {
        code_status: 'error',
        message: 'Erro ao tentar criar usuário',
        details: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }

  async verifyAccessToken(accessToken: string) {
    try {
      this.jwtService.verify(accessToken, {
        secret: process.env.JWT_SECRET,
      });

      return {
        statusCode: 200
      }
    } catch (err) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
