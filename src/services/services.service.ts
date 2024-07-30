import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service.name) private serviceModel: Model<ServiceDocument>) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const createdService = new this.serviceModel(createServiceDto);
    return createdService.save();
  }

  async findAll(): Promise<Service[]> {
    return this.serviceModel.find().exec();
  }

  async findOne(id: string): Promise<Service> {
    return this.serviceModel.findById(id).exec();
  }

  async update(id: string, updateServiceDto: Partial<CreateServiceDto>): Promise<Service> {
    return this.serviceModel.findByIdAndUpdate(id, updateServiceDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.serviceModel.findByIdAndDelete(id).exec();
  }
}
