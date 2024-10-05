import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt)

    const findEmail = await this.prismaService.user.findUnique({ where: { email: createUserDto.email } })

    if (findEmail) throw new BadRequestException("Email already in use.");

    return this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword
      }
    })
  }

}
