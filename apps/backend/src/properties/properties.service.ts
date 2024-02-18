import { Injectable, NotFoundException } from '@nestjs/common';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertiesService {
  private properties: Property[] = [
    {
      id: 1,
      title: 'Cozy Cottage',
      type: 'Buy',
      area: 'Athens',
      price: 100,
      description: 'A cozy cottage in the woods.',
    },
  ];

  findAll() {
    return this.properties;
  }

  findOne(id: string) {
    const property = this.properties.find((item) => item.id === +id);
    if (!property) {
      throw new NotFoundException(`Property #${id} not found`);
    }
    return property;
  }

  create(createPropertyDto: any) {
    this.properties.push(createPropertyDto);
    return createPropertyDto;
  }

  update(id: string, updatePropertyDto: any) {
    const existingProperty = this.findOne(id);
    if (existingProperty) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const propertyIndex = this.properties.findIndex((item) => item.id === +id);
    if (propertyIndex >= 0) {
      this.properties.splice(propertyIndex, 1);
    }
  }
}
