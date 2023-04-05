import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/use.store";
import { getAllTracks } from "../../store/actions-creators/track";
import { ITrack } from "../../types/track";
import { Track } from "../Track";
import { Loader } from "../UI";
import style from "./TrackList.module.css";

interface ITrackList {
  setTrack(track: ITrack): void;
}

export const TrackList: React.FC<ITrackList> = ({ setTrack }) => {
  const { tracks, isLoading, error } = useAppSelector((state) => state.track);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTracks());
  }, []);

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
          tracks.map(
            track => <Track
              key={track.id}
              track={track}
              setTrack={setTrack}
            />
          )
        ) : (
          <h1>Not have songs</h1>
        )}
      </ul>
    </div>
  );
};
