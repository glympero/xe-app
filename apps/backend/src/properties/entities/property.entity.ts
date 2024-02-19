import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from './area.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  type: string;
  @JoinColumn()
  @ManyToOne(() => Area, (area) => area.properties, { cascade: true })
  area: Area;
  @Column()
  price: number;
  @Column()
  description: string;
}
