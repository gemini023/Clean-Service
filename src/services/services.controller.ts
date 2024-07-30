import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly serviceService: ServicesService) {}

  @Post()
  async createService(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  async findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateServiceDto: Partial<CreateServiceDto>) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.serviceService.delete(id);
  }
}
