import React, {useEffect, useState} from "react"

import {FileUploader, FileUploaderProps} from "./FileUploader"

import {convertFileByURL} from "../../../help";

interface FileUploaderWithPreviewProps extends Omit<FileUploaderProps, 'setFile'> {
	defaultFile?: string;
}

export const FileUploaderWithPreview: React.FC<FileUploaderWithPreviewProps> = ({ name, accept, placeholder, required, defaultFile }) => {
	const [file, setFile] = useState<File>()
	const [dataURL, setDataURL] = useState<string>()

	useEffect(() => {
		if (defaultFile) {
			convertFileByURL(defaultFile).then(file => {
				if (file instanceof File) {
					setFile(file)
				}
			})
		}
	}, [defaultFile])

	useEffect(() => {
		if (!file) {
			return;
		}
	
		const reader = new FileReader()
		reader.readAsDataURL(file)

		reader.onload = () => {
			setDataURL(reader.result as string)
		}

	}, [file])

	return (
		<div>
			<img src={dataURL} width={100} height={100} alt=" " />	
			<FileUploader 
				name={name}
				accept={accept}
				placeholder={placeholder}
				required={required}
				setFile={setFile}
			/> 
		</div>
	)
}
