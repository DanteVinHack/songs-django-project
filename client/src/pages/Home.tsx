import React, {useEffect} from 'react'

import {TrackList} from "../components/TrackList";
import {Title} from '../components/UI';
import {useActions} from '../hooks/use.actions';

import {useAppSelector} from '../hooks/use.store';

export const Home: React.FC = () => {
  const { tracks, isLoading, error } = useAppSelector(state => state.track)
	const { getAllTracks } = useActions()

	useEffect(() => {
		getAllTracks()
	}, [])	

  return (
    <div className="page">
			<Title>Главная</Title>
			<TrackList
				tracks={tracks}
				isLoading={isLoading}
				error={error}
				message={"Трэков пока что, нет."}
			/>
    </div>
  );
};
