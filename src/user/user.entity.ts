import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column({
    type: 'bigint',
    transformer: {
      from: (value: string | number) => Number(value),
      to: (value: number) => value,
    },
  })
  createdAt: number;

  @Column({
    type: 'bigint',
    transformer: {
      from: (value: string | number) => Number(value),
      to: (value: number) => value,
    },
  })
  updatedAt: number;
}
