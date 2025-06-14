import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TrackModule } from '../track/track.module'; // Import TrackModule
import { AlbumModule } from 'src/album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist]), TrackModule, AlbumModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
