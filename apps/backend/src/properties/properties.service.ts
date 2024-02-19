import { Injectable, NotFoundException } from '@nestjs/common';
import { Property } from './entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Area } from './entities/area.entity';
import { CreateAreaDto } from './dto/create-area.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}

  findAll() {
    return this.propertyRepository.find({
      relations: {
        area: true,
      },
    });
  }

  async findOne(id: string) {
    const property = await this.propertyRepository.findOne({
      where: { id: +id },
      relations: {
        area: true,
      },
    });
    if (!property) {
      throw new NotFoundException(`Property #${id} not found`);
    }
    return property;
  }

  async create(createPropertyDto: CreatePropertyDto) {
    const area = await this.preloadArea(createPropertyDto.area);
    const property = this.propertyRepository.create({
      ...createPropertyDto,
      area,
    });
    return this.propertyRepository.save(property);
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    const area = await this.preloadArea(updatePropertyDto.area);
    const property = await this.propertyRepository.preload({
      id: +id,
      ...updatePropertyDto,
      area,
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

  private async preloadArea(createAreaDto: CreateAreaDto): Promise<Area> {
    const area = await this.areaRepository.findOne({
      where: { placeId: createAreaDto.placeId },
    });
    if (area) {
      return area;
    }
    return this.areaRepository.create(createAreaDto);
  }
}
