import React from 'react'

import { FloatPlayer } from "../components/FloatPlayer/FloatPlayer";
import { TrackList } from "../components/TrackList";

import { setValue } from '../store/reducers/player.slice';
import { useAppSelector } from '../hooks/use.store';

export const Home: React.FC = () => {
  const { value } = useAppSelector(state => state.player)

  return (
    <div className="home">
      <TrackList setTrack={setValue} />

      <FloatPlayer track={value} />
    </div>
  );
};
