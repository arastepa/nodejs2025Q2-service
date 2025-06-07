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
import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { validate as isUuid } from 'uuid';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAllTracks() {
    return await this.trackService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
    }
    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  @Post()
  async createTrack(@Body() dto: CreateTrackDto) {
    if (!dto.name || !dto.duration) {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }
    return await this.trackService.createTrack(dto);
  }

  @Put(':id')
  async updateTrack(@Param('id') id: string, @Body() dto: UpdateTrackDto) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
    }
    if (
      !dto.name ||
      typeof dto.name !== 'string' ||
      !dto.duration ||
      typeof dto.duration !== 'number' ||
      (dto.artistId && typeof dto.artistId !== 'string') ||
      (dto.albumId && typeof dto.albumId !== 'string')
    ) {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST); // Validate DTO fields
    }
    const track = await this.trackService.updateTrack(id, dto);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
    }
    const success = await this.trackService.deleteTrack(id);
    if (!success) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }
}
