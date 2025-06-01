import { Injectable } from '@nestjs/common';
import { Favorites } from './favorites.entity';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  getAllFavorites() {
    return {
      artists: this.favorites.artists
        .map((id) => this.artistService.getArtistById(id))
        .filter(Boolean),
      albums: this.favorites.albums
        .map((id) => this.albumService.getAlbumById(id))
        .filter(Boolean),
      tracks: this.favorites.tracks
        .map((id) => this.trackService.getTrackById(id))
        .filter(Boolean),
    };
  }

  addArtistToFavorites(artistId: string): boolean {
    const artist = this.artistService.getArtistById(artistId);
    if (!artist) return false;
    if (!this.favorites.artists.includes(artistId)) {
      this.favorites.artists.push(artistId);
    }
    return true;
  }

  removeArtistFromFavorites(artistId: string): boolean {
    const index = this.favorites.artists.indexOf(artistId);
    if (index === -1) return false;
    this.favorites.artists.splice(index, 1);
    return true;
  }

  addAlbumToFavorites(albumId: string): boolean {
    const album = this.albumService.getAlbumById(albumId);
    if (!album) return false;
    if (!this.favorites.albums.includes(albumId)) {
      this.favorites.albums.push(albumId);
    }
    return true;
  }

  removeAlbumFromFavorites(albumId: string): boolean {
    const index = this.favorites.albums.indexOf(albumId);
    if (index === -1) return false;
    this.favorites.albums.splice(index, 1);
    return true;
  }

  addTrackToFavorites(trackId: string): boolean {
    const track = this.trackService.getTrackById(trackId);
    if (!track) return false;
    if (!this.favorites.tracks.includes(trackId)) {
      this.favorites.tracks.push(trackId);
    }
    return true;
  }

  removeTrackFromFavorites(trackId: string): boolean {
    const index = this.favorites.tracks.indexOf(trackId);
    if (index === -1) return false;
    this.favorites.tracks.splice(index, 1);
    return true;
  }
}
