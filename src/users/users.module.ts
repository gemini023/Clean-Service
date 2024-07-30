import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { AuthSchema } from 'src/auth/entities/auth.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: AuthSchema}])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
