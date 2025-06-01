import { Injectable } from '@nestjs/common';
import { Artist } from './artist.entity';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: string): Artist | undefined {
    return this.artists.find((artist) => artist.id === id);
  }

  createArtist(dto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      name: dto.name,
      grammy: dto.grammy,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, dto: UpdateArtistDto): Artist | undefined {
    const artist = this.artists.find((artist) => artist.id === id);
    if (artist) {
      Object.assign(artist, dto);
    }
    return artist;
  }

  deleteArtist(id: string): boolean {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index !== -1) {
      this.artists.splice(index, 1);
      this.trackService.updateTracksByArtistId(id, null);
      this.albumService.updateAlbumsByArtistId(id, null);
      return true;
    }
    return false;
  }
}
