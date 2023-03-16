export interface ISong {
  id: number;
  title: string;
  author: number;
  file: string;
  genres: number[];
  create_at: string;
}

export interface ISongState {
  songs: ISong[];
  isLoading: boolean;
  error: string | null;
}
