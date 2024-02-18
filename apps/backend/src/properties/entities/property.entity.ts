import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  type: string;
  @Column()
  area: string;
  @Column()
  price: number;
  @Column()
  description: string;
}
