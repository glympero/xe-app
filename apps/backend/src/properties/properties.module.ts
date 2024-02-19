import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Area } from './entities/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Area])],
  controllers: [PropertiesController],
  providers: [PropertiesService],
})
export class PropertiesModule {}
