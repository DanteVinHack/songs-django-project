export interface IAddTrack {
	title: string;
	genre: string;
	file?: File;
	cover?: File;
	link_of_author: number;
}

export interface ITrack extends IAddTrack {
  id: number;
  title: string;
  file: string;
  likes_count: number;
  download: number;
  user: string;
  cover: string;
	user_of_likes: number[];
}

export interface ITrackState {
  tracks: ITrack[];
  isLoading: boolean;
  error: string | null;
}
