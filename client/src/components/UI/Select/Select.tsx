import React, {MouseEvent, useCallback, useEffect, useState} from "react"
import style from "./Select.module.css"

import {FaArrowUp, FaArrowDown} from "react-icons/fa";
import {SelectItem} from "./SelectItem";

import {IOption} from "./types";

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
	addToForm: (value: string) => void;

	options: IOption[];
}

export const Select: React.FC<SelectProps> = ({ options, addToForm }) => {
	const [show, setShow] = useState<boolean>(false)
	const [currentValue, setCurrentValue] = useState<string | null>(null)

	const toggleShow = () => {
		setShow(!show)
	}

	const setSelectValue = useCallback(({ currentTarget }: MouseEvent<HTMLLIElement>) => {
		const value = currentTarget.dataset?.value

		if (!value) {
			throw new Error("Option dataset-value don't exist") 
		}

		setCurrentValue(value)
		setShow(false)
	}, [currentValue])

	useEffect(() => {
    if (currentValue) {
      addToForm(currentValue)	
    }
	}, [currentValue])


	return (
		<div>
			<h3 onClick={toggleShow} className={style.select__preview}>
        <span>Выбрано: {currentValue || ""}</span>
        {show ? <FaArrowDown fontSize={18} /> : <FaArrowUp fontSize={18} />}
      </h3>
			<div className={`${style.select} ${show ? "" : "display_none"}`}>
				<ul className={style.select__list}>
					{options.map(option => (
						<SelectItem
							key={option.id}

							className={style.select__item}
							option={option}
							onClick={setSelectValue}
						/>
					))}
				</ul>
			</div>
		</div>
	)
}
