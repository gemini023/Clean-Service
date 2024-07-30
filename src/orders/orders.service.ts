import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async update(id: string, updateOrderDto: Partial<CreateOrderDto>): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
