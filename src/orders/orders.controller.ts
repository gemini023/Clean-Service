import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) { }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: Partial<CreateOrderDto>) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.orderService.delete(id);
  }
}
