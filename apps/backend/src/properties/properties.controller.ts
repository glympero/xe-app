import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}
  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    const property = this.propertiesService.create(createPropertyDto);
    if (property) {
      return property;
    }
    throw new ServiceUnavailableException('Service Unavailable');
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    const property = this.propertiesService.update(id, updatePropertyDto);
    if (property) {
      return property;
    }
    throw new ServiceUnavailableException('Service Unavailable');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(id);
  }
}
