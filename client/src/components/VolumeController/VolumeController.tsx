import React from "react"
import style from "./VolumeController.module.css"
import {FaVolumeDown, FaVolumeMute, FaVolumeUp} from "react-icons/fa";

import {Button, Input} from "../UI";

interface VolumeControllerProps {
	onChange(event: React.ChangeEvent<HTMLInputElement>): void;
	volume: number;
}

export const VolumeController: React.FC<VolumeControllerProps> = ({ onChange, volume }) => {

	return (
		<>
			<Button color="white" className={style["volume-controller"]}> 
				{
					volume > .5 ? <FaVolumeUp /> :
					volume <= .5 && volume > 0 ? <FaVolumeDown /> :
					<FaVolumeMute />
				}
				<Input
					onChange={onChange}
					type="range"
					max="100"
					min="0"
					step="5"
					value={volume * 100}
				/> 
			</Button>
		</>
	)
}
