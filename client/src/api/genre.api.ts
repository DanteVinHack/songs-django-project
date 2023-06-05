import {instance} from ".";
import {IGenre} from "../types/genre";

export const GenreAPI = {
  getGenres() {
    return instance.get<IGenre[]>("api/genre/");
  }
}
