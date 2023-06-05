import React, { MouseEvent } from "react"
import {IOption} from "./types"

interface SelectItemProps {
	option: IOption;
	className: string;

	onClick: (event: MouseEvent<HTMLLIElement>) => void;
}

export const SelectItem: React.FC<SelectItemProps> = ({ option, onClick, className }) => {

	return (
		<li 
			onClick={onClick}
			className={className}

			data-value={option.value}
		>
			{option.value}
		</li>
	)
}
