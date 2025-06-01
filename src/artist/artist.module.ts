import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TrackModule } from '../track/track.module'; // Import TrackModule
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [TrackModule, AlbumModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
