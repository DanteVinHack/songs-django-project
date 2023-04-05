import React from 'react'
import style from './Loader.module.css'

interface ILoader {
  big?: boolean; 
  color?: string;
}

export const Loader: React.FC<ILoader> = ({ big, color, ...props }) => {
  return (
    <span className={style.loader} style={{
        width: big ? "125px" : "75px",  
        height: big ? "125px" : "75px",  
      }}
      {...props}
    ></span>
  )
}
