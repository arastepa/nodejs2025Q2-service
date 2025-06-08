import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  async getAllArtists(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  async getArtistById(id: string): Promise<Artist | undefined> {
    return this.artistRepository.findOne({ where: { id } });
  }

  async createArtist(dto: CreateArtistDto): Promise<Artist> {
    const newArtist = this.artistRepository.create({
      name: dto.name,
      grammy: dto.grammy,
    });
    return this.artistRepository.save(newArtist);
  }

  async updateArtist(
    id: string,
    dto: UpdateArtistDto,
  ): Promise<Artist | undefined> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (artist) {
      Object.assign(artist, dto);
      return this.artistRepository.save(artist);
    }
    return undefined;
  }

  async deleteArtist(id: string): Promise<boolean> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (artist) {
      await this.artistRepository.delete(id);
      await this.trackService.updateTracksByArtistId(id, null);
      await this.albumService.updateAlbumsByArtistId(id, null);
      return true;
    }
    return false;
  }
}
