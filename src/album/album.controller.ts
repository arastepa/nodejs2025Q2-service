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
  async getAllAlbums() {
    return await this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Post()
  async createAlbum(@Body() dto: CreateAlbumDto) {
    if (!dto.name || !dto.year || typeof dto.year !== 'number') {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
    return await this.albumService.createAlbum(dto);
  }

  @Put(':id')
  async updateAlbum(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
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
    const album = await this.albumService.updateAlbum(id, dto);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }
    const success = await this.albumService.deleteAlbum(id);
    if (!success) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}
