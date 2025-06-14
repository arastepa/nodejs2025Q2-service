import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites } from './favorites.entity';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  async getAllFavorites() {
    const favorites = await this.favoritesRepository.findOne({ where: {} });
    if (!favorites) {
      return { artists: [], albums: [], tracks: [] };
    }

    return {
      artists: await Promise.all(
        favorites.artists.map((id) => this.artistService.getArtistById(id)),
      ).then((results) => results.filter(Boolean)),
      albums: await Promise.all(
        favorites.albums.map((id) => this.albumService.getAlbumById(id)),
      ).then((results) => results.filter(Boolean)),
      tracks: await Promise.all(
        favorites.tracks.map((id) => this.trackService.getTrackById(id)),
      ).then((results) => results.filter(Boolean)),
    };
  }

  async addArtistToFavorites(artistId: string): Promise<boolean> {
    const artist = await this.artistService.getArtistById(artistId);
    if (!artist) return false;

    const favorites = await this.getOrCreateFavorites();
    if (!favorites.artists.includes(artistId)) {
      favorites.artists.push(artistId);
      await this.favoritesRepository.save(favorites);
    }
    return true;
  }

  async removeArtistFromFavorites(artistId: string): Promise<boolean> {
    const favorites = await this.getOrCreateFavorites();
    const index = favorites.artists.indexOf(artistId);
    if (index === -1) return false;

    favorites.artists.splice(index, 1);
    await this.favoritesRepository.save(favorites);
    return true;
  }

  async addAlbumToFavorites(albumId: string): Promise<boolean> {
    const album = await this.albumService.getAlbumById(albumId);
    if (!album) return false;

    const favorites = await this.getOrCreateFavorites();
    if (!favorites.albums.includes(albumId)) {
      favorites.albums.push(albumId);
      await this.favoritesRepository.save(favorites);
    }
    return true;
  }

  async removeAlbumFromFavorites(albumId: string): Promise<boolean> {
    const favorites = await this.getOrCreateFavorites();
    const index = favorites.albums.indexOf(albumId);
    if (index === -1) return false;

    favorites.albums.splice(index, 1);
    await this.favoritesRepository.save(favorites);
    return true;
  }

  async addTrackToFavorites(trackId: string): Promise<boolean> {
    const track = await this.trackService.getTrackById(trackId);
    if (!track) return false;

    const favorites = await this.getOrCreateFavorites();
    if (!favorites.tracks.includes(trackId)) {
      favorites.tracks.push(trackId);
      await this.favoritesRepository.save(favorites);
    }
    return true;
  }

  async removeTrackFromFavorites(trackId: string): Promise<boolean> {
    const favorites = await this.getOrCreateFavorites();
    const index = favorites.tracks.indexOf(trackId);
    if (index === -1) return false;

    favorites.tracks.splice(index, 1);
    await this.favoritesRepository.save(favorites);
    return true;
  }

  private async getOrCreateFavorites(): Promise<Favorites> {
    let favorites = await this.favoritesRepository.findOne({ where: {} });
    if (!favorites) {
      favorites = this.favoritesRepository.create({
        artists: [],
        albums: [],
        tracks: [],
      });
      await this.favoritesRepository.save(favorites);
    }
    return favorites;
  }
}
