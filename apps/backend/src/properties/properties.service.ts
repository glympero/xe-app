import { Injectable, NotFoundException } from '@nestjs/common';
import { Property } from './entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  findAll() {
    return this.propertyRepository.find();
  }

  async findOne(id: string) {
    const coffee = await this.propertyRepository.findOne({
      where: { id: +id },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createPropertyDto: CreatePropertyDto) {
    const coffee = this.propertyRepository.create(createPropertyDto);
    return this.propertyRepository.save(coffee);
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    const property = await this.propertyRepository.preload({
      id: +id,
      ...updatePropertyDto,
    });
    if (!property) {
      throw new NotFoundException(`Property #${id} not found`);
    }
    return this.propertyRepository.save(property);
  }

  async remove(id: string) {
    const property = await this.findOne(id);
    return this.propertyRepository.remove(property);
  }
}
