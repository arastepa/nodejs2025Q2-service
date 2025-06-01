import { Injectable } from '@nestjs/common';
import { Album } from './album.entity';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { v4 as uuidv4 } from 'uuid';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];
  constructor(private readonly trackService: TrackService) {}

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album | undefined {
    return this.albums.find((album) => album.id === id);
  }

  createAlbum(dto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId || null,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, dto: UpdateAlbumDto): Album | undefined {
    const album = this.albums.find((album) => album.id === id);
    if (album) {
      Object.assign(album, dto);
    }
    return album;
  }

  deleteAlbum(id: string): boolean {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index !== -1) {
      this.albums.splice(index, 1);
      this.trackService.updateTracksByAlbumId(id, null);
      return true;
    }
    return false;
  }

  updateAlbumsByArtistId(artistId: string, newArtistId: string | null): void {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = newArtistId;
      }
    });
  }
}
