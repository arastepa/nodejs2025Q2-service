import { Entity, Column } from 'typeorm';

@Entity()
export class Favorites {
  @Column('simple-array')
  artists: string[];

  @Column('simple-array')
  albums: string[];

  @Column('simple-array')
  tracks: string[];
}
