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
import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { validate as isUuid } from 'uuid';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAllArtists() {
    return await this.artistService.getAllArtists();
  }

  @Get(':id')
  async getArtistById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid artist ID', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Post()
  async createArtist(@Body() dto: CreateArtistDto) {
    if (!dto.name || typeof dto.name !== 'string' || dto.grammy === undefined) {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
    return await this.artistService.createArtist(dto);
  }

  @Put(':id')
  async updateArtist(@Param('id') id: string, @Body() dto: UpdateArtistDto) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid artist ID', HttpStatus.BAD_REQUEST);
    }
    if (
      (dto.name && typeof dto.name !== 'string') ||
      (dto.grammy !== undefined && typeof dto.grammy !== 'boolean')
    ) {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistService.updateArtist(id, dto);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid artist ID', HttpStatus.BAD_REQUEST);
    }
    const success = await this.artistService.deleteArtist(id);
    if (!success) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
