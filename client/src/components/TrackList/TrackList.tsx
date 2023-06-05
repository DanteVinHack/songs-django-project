import React from "react";
import { useAppSelector } from "../../hooks/use.store";
import { ITrack } from "../../types/track";
import { Track } from "../Track";
import { Loader } from "../UI";
import style from "./TrackList.module.css";

interface ITrackList {
	tracks: ITrack[]
	isLoading: boolean;
	error: string | null;
	message: string;
}

export const TrackList: React.FC<ITrackList> = ({ tracks, isLoading, error, message }) => {
	const currentTrack = useAppSelector(state => state.player.value)
	const isPlay = useAppSelector(state => state.player.isPlay)

  if (isLoading) {
    return (
      <div className={style.song__list}>
        <Loader />
      </div>
    ) 
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <ul className={style.song__list}>
        {tracks.length ? (
					 tracks.map(track =>
						<Track
              key={track.id}
              track={track}
							isPlay={track.id == currentTrack?.id && isPlay}
            />
          )
        ) : (
          <h1>{ message }</h1>
        )}
      </ul>
    </div>
  );
};
