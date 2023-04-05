import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Button, Input } from '../UI';
import { FaPause, FaPlay } from 'react-icons/fa';
import { TbRepeatOnce, TbRepeatOff, BiVolume } from 'react-icons/all'
import style from './FloatPlayer.module.css'

import { ITrack } from '../../types/track';
import {
  setValue,
  setPlay,
  setPause,
  setVolume,
  setCurrentTime,
  setDuration,
  setRepeat
} from '../../store/reducers/player.slice'
import { useAppDispatch, useAppSelector } from '../../hooks/use.store';


interface IFloatPlayer {
  track: ITrack;
}

export const FloatPlayer: React.FC<IFloatPlayer> = () => {
  const {
    player: { value, isPlay, volume, currentTime, duration, repeat },
    track: { tracks }
  } = useAppSelector(state => state)
  const dispatch = useAppDispatch()
  const audio = useRef<HTMLAudioElement>(new Audio) as MutableRefObject<HTMLAudioElement>
  const [volumeVisible, setVolumeVisible] = useState<boolean>(false)

  const formatToMinute = new Intl.DateTimeFormat('ru', {
    minute: "numeric",
    second: "numeric",
  })

  useEffect(() => {
    if (value) {
      audio.current.src = value.file
      isPlay && audio.current.play()
    }
  }, [value])

  useEffect(() => {
    if (isPlay) {
      audio.current.play()
    } else {
      audio.current.pause()
    }
  }, [isPlay])

  useEffect(() => {
    audio.current.volume = volume
  }, [volume])

  const changeVolume = (volume: number) => {
    dispatch(setVolume(volume / 100))
  }

  const changeCurrentTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentTime = +event.target.value

    dispatch(setCurrentTime(currentTime))
    audio.current.currentTime = currentTime
  }

  const togglePlay = () => {
    if (isPlay) {
      dispatch(setPause())
    } else {
      dispatch(setPlay())
    }
  }

  const toggleRepeat = () => {
    if (repeat) {
      dispatch(setRepeat(false))
    } else {
      dispatch(setRepeat(true))
    }
  }

  const onEnded = () => {
    if (repeat) {
      dispatch(setCurrentTime(0))
      audio.current.play()
      audio.current.currentTime = 0;
    } else {
      const trackIndex = tracks.findIndex(({ id }) => value.id === id)
      console.log(trackIndex)
      dispatch(setValue(tracks[trackIndex + 1] || tracks[0])) 
    }
  }

  if (!value) { 
    return null
  }

  return (
    <div className={style["float-player"]}>
      <Button color="white" onClick={togglePlay}>
        {!isPlay ? <FaPlay /> : <FaPause />}
      </Button>
      <Button color="white" onClick={toggleRepeat}>
        {!repeat ? <TbRepeatOnce /> : <TbRepeatOff />}
      </Button>
      <Input
        onChange={changeCurrentTime}
        type="range"
        max={duration}
        min="0"
        value={currentTime}
      />
      <span style={{ color: "white" }}>
        {formatToMinute.format(currentTime * 1000)}
        /
        {formatToMinute.format(duration * 1000)}
      </span>
      <div onClick={() => setVolumeVisible(!volumeVisible)} style={{ position: "relative", paddingLeft: "20px" }}>
        {
          volumeVisible ?
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeVolume(+event.target.value)}
            type="range"
            max="100"
            min="0"
            vertical={true}
            className={style["float-player__volume"]}
          /> : 
          <BiVolume className={style["float-player__volume"]} style={{ color: "white" }} />
        }
        <span style={{ color: "white" }}>{Math.round(volume * 100)}/100</span>
      </div>
      <audio
        ref={audio}
        onTimeUpdate={({ target }: React.ChangeEvent<HTMLAudioElement>) => dispatch(setCurrentTime(Math.ceil(target.currentTime)))}
        onLoadedData={({ target }: React.ChangeEvent<HTMLAudioElement>) => dispatch(setDuration(Math.ceil(target.duration)))}
        onEnded={onEnded}
      />
    </div>
  )
}
