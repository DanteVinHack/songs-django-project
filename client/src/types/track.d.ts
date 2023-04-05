import { ChangeEvent } from "react";

export interface ITrack {
  id: number;
  title: string;
  file: string;
  likes_count: number;
  download: number;
  user: string;
  cover: string;
}

export interface ITrackState {
  tracks: ITrack[];
  isLoading: boolean;
  error: string | null;
}
