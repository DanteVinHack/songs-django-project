import React from 'react'
import style from './FloatPlayer.module.css'

import {VolumeController} from '../VolumeController';

import {Button, Input} from '../UI';

import {FaPause, FaPlay} from 'react-icons/fa';
import {TbRepeat, TbRepeatOff} from 'react-icons/all'

import {usePlayer} from '../../hooks/use.player';

export const FloatPlayer: React.FC = () => {
	const { audio, player, controller } = usePlayer()

	if (!player?.value) {
		return null
	}

  return (
    <div className={style["player"]}>
			<div className={style["player__buttons"]}>

				<Button color="white" onClick={controller.togglePlay}>
					{!player.isPlay ? <FaPlay /> : <FaPause />}
				</Button>
				<Button color="white" onClick={controller.toggleRepeat}>
					{!player.repeat ? <TbRepeat /> : <TbRepeatOff />}
				</Button>

				<VolumeController
					onChange={controller.changeVolume}
					volume={player.volume}
				/>

			</div>
			<span style={{ color: "white" }}>
				{ player.value.title } 
			</span>
			<Input
				onChange={controller.changeCurrentTime}
				type="range"
				max={player.duration || 100}
				min="0"
				value={player.currentTime}
			/>
			<audio
				autoPlay
				ref={audio}
				onTimeUpdate={controller.onTimeUpdate}
				onLoadedData={controller.onLoadedData}
				onEnded={controller.onEnded}
				onPlay={controller.onPlay}
				onPause={controller.onPause}
				className="display_none"
			/>
    </div>
  )
}
