import {ChangeEvent, useState} from "react"

const enum InputType {
	file = "file",
	text = "text"
}

export const useForm = <T>(initialValue: T) => {
	const [form, setForm]= useState<T>(initialValue)

	const onChange = ({ target }: ChangeEvent<HTMLFormElement>) => {
		if (target.type == InputType.file) {
			setForm({ ...form, [target.name]: target.files[0] })
		} else {
			setForm({ ...form, [target.name]: target.value })
		}
	}

	const addToForm = <K extends keyof T>(key: K, value: T[K]) => {
		setForm({ ...form, [key]: value })
	}

	return { form, onChange, addToForm }
}
