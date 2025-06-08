import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from 'src/track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
