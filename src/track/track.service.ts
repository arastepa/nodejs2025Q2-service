import { Injectable } from '@nestjs/common';
import { Track } from './track.entity';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(id: string): Track | undefined {
    return this.tracks.find((track) => track.id === id);
  }

  createTrack(dto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      name: dto.name,
      artistId: dto.artistId || null,
      albumId: dto.albumId || null,
      duration: dto.duration,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, dto: UpdateTrackDto): Track | undefined {
    const track = this.tracks.find((track) => track.id === id);
    if (track) {
      Object.assign(track, dto);
    }
    return track;
  }

  deleteTrack(id: string): boolean {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index !== -1) {
      this.tracks.splice(index, 1);
      return true;
    }
    return false;
  }
  updateTracksByArtistId(artistId: string, newArtistId: string | null): void {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = newArtistId;
      }
    });
  }
}
