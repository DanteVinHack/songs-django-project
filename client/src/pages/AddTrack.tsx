import React, {useEffect} from "react"
import {useNavigate} from "react-router-dom";

import {TrackAPI} from "../api";

import {Form} from "../components/Form"
import {Button, FileUploader, FileUploaderWithPreview, Input, Select, Title} from "../components/UI"

import {useAppSelector} from "../hooks/use.store";
import {useActions} from "../hooks/use.actions";
import {useStorage} from "../hooks/use.storage";
import {useForm} from "../hooks/use.form";

import {IAddTrack} from "../types/track";
import {IUserToken} from "../types/user";

export const AddTrack: React.FC = () => {
	const { getAllGenres } = useActions()
	const { genres } = useAppSelector(state => state.genre)

	const [token] = useStorage<IUserToken>("token")
	const navigator = useNavigate()

	const {form, onChange, addToForm} = useForm<IAddTrack>({
		link_of_author: token?.user_id || 1,
		title: "",
		file: undefined,
		cover: undefined,
		genre: ""
	})
	
	useEffect(() => {
		getAllGenres()
	}, [])

	const selectHandler = (value: string) => {
		addToForm("genre", value)	
	}

	const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()

		TrackAPI.add(form).then(() => {
      navigator('/')
    })
	}

	return (
		<div className="page">
			<Title>Добавить свой трэк</Title>
			<Form onSubmit={onSubmit} onChange={onChange}>

				<Input placeholder="Название трэка" name="title" required />

				<Select
					name="genre"
					options={genres.map(genre => ({text: genre.name, value: genre.name, id: genre.id}))}
					addToForm={selectHandler}
					defaultValue={0}
				/>

				<FileUploader
					placeholder="Загрузить трэк"
					name="file"
					accept="audio/*"
					required={true}
				/>

				<FileUploaderWithPreview
					placeholder="Загрузить превью трэк"
					name="cover"
					accept="image/jpg"
					required={true}
				/>

				<Button>
					Добавить трэк
				</Button>
			</Form>
		</div>
	)
}
