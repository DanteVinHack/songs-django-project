import React, { memo } from 'react'
import style from "./Track.module.css"

import {FaPlay, FaPause, FaHeart, FaDownload} from 'react-icons/fa'
import {Button} from '../UI'

import {useStorage} from '../../hooks/use.storage';

import {useActions} from '../../hooks/use.actions';

import {ITrack} from '../../types/track';
import {IUserToken} from '../../types/user';

interface ITrackProps {
  track: ITrack;
	isPlay: boolean
}

export const Track: React.FC<ITrackProps> = memo(({ track, isPlay }) => {
	const { setTrack, updateTrack } = useActions()
	
	const [token] = useStorage<IUserToken>('token')

	const trackLiked = track.user_of_likes.includes(token?.user_id || -1)
	
	let toggleLikes = () => {}
	let toggleDownload = () => {}

	const changeTrack = () => {
		setTrack(track)
	}

	if (token) {
		toggleLikes = () => {
			if (!trackLiked) {
				updateTrack({
					...track,
					likes_count: track.likes_count + 1,
					user_of_likes: [...track.user_of_likes, token.user_id]
				})
			} else {
				updateTrack({
					...track,
					likes_count: track.likes_count - 1,
					user_of_likes: track.user_of_likes.filter(user_id => token.user_id !== user_id)
				})
			}
		}


		toggleDownload = () => {
			updateTrack({
				...track,
				download: track.download + 1
			})

			const link = document.createElement("a")
			link.href = track.file
			link.target = "_blank"

			link.click()
		}
	}		

  return (
    <li>
      <div className={`${style.player} ${isPlay && style.hover}`}>
        <div className={style.player__wrapper} style={{backgroundImage: `url(${track.cover})`}}>
          <Button
            type="button"
            className={style.player__button}
            onClick={changeTrack}
          >
            {!isPlay  ? <FaPlay /> : <FaPause />}
          </Button>
        </div>
				<div className={style.player__info}>
					<h4 className={style.player__title}>
						{track.title}
					</h4>
					{/*
					<h4>
						{track.user}
					</h4>
					*/}
				</div>
				<div className={style.player__socials}>
					<span
						className={`${style.player__social} ${trackLiked ? style.active : ""}`}
						onClick={toggleLikes}
					>
						<FaHeart />
						{track.likes_count}
					</span>
					<span
						className={style.player__social}
						onClick={toggleDownload}
					>
						<FaDownload />
						{track.download}
					</span>
				</div>
      </div>  
    </li>
  )
})
