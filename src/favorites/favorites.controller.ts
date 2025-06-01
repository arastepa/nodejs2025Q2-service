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
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid artist ID', HttpStatus.BAD_REQUEST);
    }
    const success = this.favoritesService.addArtistToFavorites(id);
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
  removeArtistFromFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid artist ID', HttpStatus.BAD_REQUEST);
    }
    const success = this.favoritesService.removeArtistFromFavorites(id);
    if (!success) {
      throw new HttpException(
        'Artist not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }
    const success = this.favoritesService.addAlbumToFavorites(id);
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
  removeAlbumFromFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }
    const success = this.favoritesService.removeAlbumFromFavorites(id);
    if (!success) {
      throw new HttpException(
        'Album not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('track/:id')
  addTrackToFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
    }
    const success = this.favoritesService.addTrackToFavorites(id);
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
  removeTrackFromFavorites(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
    }
    const success = this.favoritesService.removeTrackFromFavorites(id);
    if (!success) {
      throw new HttpException(
        'Track not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
