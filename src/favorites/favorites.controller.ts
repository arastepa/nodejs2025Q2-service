import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { validate as isUuid } from 'uuid';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAllFavorites() {
    return await this.favoritesService.getAllFavorites();
  }

  @Post('artist/:id')
  async addArtistToFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid artist ID', HttpStatus.BAD_REQUEST);
    }
    const success = await this.favoritesService.addArtistToFavorites(id);
    if (!success) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return { message: 'Artist added to favorites' };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid artist ID', HttpStatus.BAD_REQUEST);
    }
    const success = await this.favoritesService.removeArtistFromFavorites(id);
    if (!success) {
      throw new HttpException(
        'Artist not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('album/:id')
  async addAlbumToFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }
    const success = await this.favoritesService.addAlbumToFavorites(id);
    if (!success) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return { message: 'Album added to favorites' };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }
    const success = await this.favoritesService.removeAlbumFromFavorites(id);
    if (!success) {
      throw new HttpException(
        'Album not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('track/:id')
  async addTrackToFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
    }
    const success = await this.favoritesService.addTrackToFavorites(id);
    if (!success) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return { message: 'Track added to favorites' };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
    }
    const success = await this.favoritesService.removeTrackFromFavorites(id);
    if (!success) {
      throw new HttpException(
        'Track not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
