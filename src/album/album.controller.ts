import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { validate as isUuid } from 'uuid';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getAlbumById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }
    const album = this.albumService.getAlbumById(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Post()
  createAlbum(@Body() dto: CreateAlbumDto) {
    if (!dto.name || !dto.year || typeof dto.year !== 'number') {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
    return this.albumService.createAlbum(dto);
  }

  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }
    if (
      (dto.name && typeof dto.name !== 'string') ||
      (dto.year && typeof dto.year !== 'number') ||
      (dto.artistId && typeof dto.artistId !== 'string')
    ) {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
    const album = this.albumService.updateAlbum(id, dto);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }
    const success = this.albumService.deleteAlbum(id);
    if (!success) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}
