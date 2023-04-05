import React from 'react'
import style from "./Track.module.css"

import { FaPlay, FaPause } from 'react-icons/fa'
import { Button } from '../UI'

import { ITrack } from '../../types/track';
import { useAppDispatch, useAppSelector } from '../../hooks/use.store';
import { setValue } from '../../store/reducers/player.slice';

interface ITrackProps {
  track: ITrack;
}

export const Track: React.FC<ITrackProps> = ({ track }) => {
  const { value, isPlay: playerIsPlay } = useAppSelector(state => state.player)
  const dispatch = useAppDispatch()

  const isPlay = track.id === value?.id

  const setTrack = () => {
    dispatch(setValue(track))
  }

  return (
    <>
      <div className={`${style.player} ${isPlay && style.hover}`}>
        <div className={style.player__wrapper} style={{backgroundImage: `url(${track.cover})`}}>
          <Button
            type="button"
            className={style.player__button}
            onClick={setTrack}
          >
            {!isPlay || !playerIsPlay  ? <FaPlay /> : <FaPause />}
          </Button>
        </div>
        <h2>
          {track.user}
        </h2>
      </div>  
    </>
  )
}
