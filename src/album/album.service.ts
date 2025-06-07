import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    private readonly trackService: TrackService,
  ) {}

  async getAllAlbums(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  async getAlbumById(id: string): Promise<Album | undefined> {
    return this.albumRepository.findOne({ where: { id } });
  }

  async createAlbum(dto: CreateAlbumDto): Promise<Album> {
    const newAlbum = this.albumRepository.create({
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId || null,
    });
    return this.albumRepository.save(newAlbum);
  }

  async updateAlbum(
    id: string,
    dto: UpdateAlbumDto,
  ): Promise<Album | undefined> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (album) {
      Object.assign(album, dto);
      return this.albumRepository.save(album);
    }
    return undefined;
  }

  async deleteAlbum(id: string): Promise<boolean> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (album) {
      await this.albumRepository.delete(id);
      await this.trackService.updateTracksByAlbumId(id, null);
      return true;
    }
    return false;
  }

  async updateAlbumsByArtistId(
    artistId: string,
    newArtistId: string | null,
  ): Promise<void> {
    const albums = await this.albumRepository.find({ where: { artistId } });
    for (const album of albums) {
      album.artistId = newArtistId;
      await this.albumRepository.save(album);
    }
  }
}
