import React, {useEffect} from "react";

import {TrackList} from "../components/TrackList";
import {Title} from "../components/UI";

import {useAppSelector} from "../hooks/use.store";
import {useActions} from "../hooks/use.actions";

export const Favorite: React.FC = () => {
	const { tracks, isLoading, error } = useAppSelector(state => state.track)
	const { getFavoriteTracks } = useActions()

	useEffect(() => {
		getFavoriteTracks()
	}, [])

	return (
		<div className="page">
			<Title>Любимые песни</Title>
			<TrackList
				tracks={tracks}
				isLoading={isLoading}
				error={error}
				message="У вас нет любимых трэков"
			/>
		</div>
	)
}
