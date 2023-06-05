import React, { useRef, useEffect } from 'react';

import {useAppSelector} from './use.store';
import {useActions} from './use.actions';

export const usePlayer = () => {
  const player = useAppSelector(state => state.player)
	const { tracks } = useAppSelector(state => state.track)
	const actions = useActions()

  const audio = useRef<HTMLAudioElement>(new Audio)

	useEffect(() => {
		audio.current.volume = player.volume

		return () => {
			actions.setValue(null)
		}
	}, [])

  useEffect(() => {

		if (player.value) {
			audio.current.src = player.value.file

			if (player.isPlay) {
				audio.current.play()
			}
		} 
	}, [player.value])

  useEffect(() => {
    if (player.isPlay) {
			audio.current?.play()
    } else {
      audio.current?.pause()
    }
  }, [player.isPlay])

  useEffect(() => {
		if (player.value) {
			audio.current.volume = player.volume
		}
  }, [player.volume])

	const changeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
		const volume = +event.target.value
    actions.setVolume(volume / 100)
  }

  const changeCurrentTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentTime = +event.target.value

    actions.setCurrentTime(currentTime)
    audio.current.currentTime = currentTime
  }

	const onPlay = () => {
		actions.setPlay()
	}

	const onPause = () => {
		actions.setPause()
	}

	const onTimeUpdate = ({ target }: React.ChangeEvent<HTMLAudioElement>) => {
		actions.setCurrentTime(Math.ceil(target.currentTime))
	}

	const onLoadedData = ({ target }: React.ChangeEvent<HTMLAudioElement>) => {
		target.volume = player.volume
		actions.setDuration(Math.ceil(target.duration))
	}


  const togglePlay = () => {
    if (player.isPlay) {
      actions.setPause()
    } else {
      actions.setPlay()
    }
  }

  const toggleRepeat = () => {
		actions.setRepeat(player.repeat ? false : true)
  }

  const onEnded = () => {
    if (player.repeat) {
      actions.setCurrentTime(0)
      audio.current.play()
      audio.current.currentTime = 0;
    } else {
      const trackIndex = tracks.findIndex(({ id }) => player.value.id === id)
      actions.setValue(tracks[trackIndex + 1] || tracks[0]) 
    }
  }

	return {
		audio,
		player,
		controller: {
			onPlay,
			onPause,
			onEnded,
			onTimeUpdate,
			onLoadedData,
			changeVolume,
			changeCurrentTime,
			togglePlay,
			toggleRepeat,
		}
	}
}
