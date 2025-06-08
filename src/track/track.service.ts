import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './track.entity';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async getAllTracks(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  async getTrackById(id: string): Promise<Track | undefined> {
    return this.trackRepository.findOne({ where: { id } });
  }

  async createTrack(dto: CreateTrackDto): Promise<Track> {
    const newTrack = this.trackRepository.create({
      name: dto.name,
      artistId: dto.artistId || null,
      albumId: dto.albumId || null,
      duration: dto.duration,
    });
    return this.trackRepository.save(newTrack);
  }

  async updateTrack(
    id: string,
    dto: UpdateTrackDto,
  ): Promise<Track | undefined> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (track) {
      Object.assign(track, dto);
      return this.trackRepository.save(track);
    }
    return undefined;
  }

  async deleteTrack(id: string): Promise<boolean> {
    const result = await this.trackRepository.delete(id);
    return result.affected > 0;
  }

  async updateTracksByArtistId(
    artistId: string,
    newArtistId: string | null,
  ): Promise<void> {
    const tracks = await this.trackRepository.find({ where: { artistId } });
    for (const track of tracks) {
      track.artistId = newArtistId;
      await this.trackRepository.save(track);
    }
  }

  async updateTracksByAlbumId(
    albumId: string,
    newAlbumId: string | null,
  ): Promise<void> {
    const tracks = await this.trackRepository.find({ where: { albumId } });
    for (const track of tracks) {
      track.albumId = newAlbumId;
      await this.trackRepository.save(track);
    }
  }
}
