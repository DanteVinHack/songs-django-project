export interface IGenre {
	id: number;
	name: string;
}

export interface IGenreState {
	genres: IGenre[],
	isLoading: boolean;
	error: string | null;
}
