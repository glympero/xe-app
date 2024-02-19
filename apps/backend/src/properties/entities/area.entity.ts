import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Property } from './property.entity';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  placeId: string;

  @Column()
  mainText: string;

  @Column()
  secondaryText: string;

  @OneToMany(() => Property, (property) => property.area)
  properties: Property[];
}
