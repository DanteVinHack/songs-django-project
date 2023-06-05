import React, { useRef } from 'react'
import style from "./FileUploader.module.css"

import { Input, Button } from '../index'

export interface FileUploaderProps {
  name: string;
  accept: string;
	placeholder: string;
	setFile?(file: File): void;
	required: boolean;
} 

export const FileUploader: React.FC<FileUploaderProps> = ({ name, accept, placeholder, required, setFile }) => {
  const input = useRef<HTMLInputElement>(null)
	
  const changeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) {
			return;
		}
		
		if (setFile) {
			setFile(event.target.files[0])
		}
  }

  return (
    <div className={style["file-uploader"]}>
			{ required ?
				<Input
					name={name}
					ref={input}
					type="file"
					accept={accept}
					multiple={false}
					onChange={changeFile}
					required
					className="display_none"
				/> :
				<Input
					name={name}
					ref={input}
					type="file"
					accept={accept}
					multiple={false}
					onChange={changeFile}
					className="display_none"
				/>
			}
			<h4>{ input.current?.files[0]?.name || "" }</h4>
      <Button type="button" onClick={() => input.current?.click()}>
				{placeholder}
      </Button>
    </div>
  )
}
