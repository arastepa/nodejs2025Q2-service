import * as dotenv from 'dotenv';
import { Album } from 'src/album/album.entity';
import { Artist } from 'src/artist/artist.entity';
import { Favorites } from 'src/favorites/favorites.entity';
import { Track } from 'src/track/track.entity';
import { User } from 'src/user/user.entity';
import { DataSource } from 'typeorm';

dotenv.config();
console.log(process.env.DATABASE_HOST);
console.log(process.env.DATABASE_PORT);
console.log(process.env.DATABASE_USER);
console.log(process.env.DATABASE_PASSWORD);
console.log(process.env.DATABASE_NAME);

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Track, Album, Artist, Favorites],
  synchronize: false,
  migrations: ['src/config/*.ts'],
  migrationsTableName: 'migrations',
});
