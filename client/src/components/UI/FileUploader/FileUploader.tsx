import React, { useEffect, useRef, useState } from 'react'
import style from "./FileUploader.module.css"

import { Input, Button } from '../index'

interface FileUploaderProps {
  name: string;
  defaultImage?: string;
  accept: string;
  rounded?: boolean;
} 

export const FileUploader: React.FC<FileUploaderProps> = ({ name, accept, defaultImage, rounded }) => {
  const ref = useRef<HTMLInputElement>()
  const [image, setImage] = useState<string>(defaultImage || "")

  useEffect(() => {
    if (defaultImage) {
      setImage(defaultImage)
    }
  }, [defaultImage])

  const changeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      return;
    }

    const reader = new FileReader()
    const file = event.target?.files[0]
    reader.readAsDataURL(file)

    reader.onload = () => {
      const result = reader.result as string
      setImage(result)
    }
  }

  return (
    <div className={style["file-uploader"]}>
      { image && 
        <img
          className={`${style["file-uploader__image"]} ${rounded && "rounded"}`}
          width="150"
          height="150"
          src={image}
        /> 
      }
      <Input
        name={name}
        ref={ref}
        type="file"
        accept={accept}
        multiple={false}
        onChange={changeFile}
        style={{ display: "none" }}
      />
      <Button type="button" onClick={() => ref.current?.click()}>
        Загрузить новую аватарку
      </Button>
    </div>
  )
}
