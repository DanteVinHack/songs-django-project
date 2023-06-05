import React from "react"

type TTitle = "title" | "subtitle"

interface TitleProps extends React.PropsWithChildren {
	type?: TTitle;
}

export const Title: React.FC<TitleProps> = ({ type = "title", children }) => {

	if (type === "subtitle") {
		return (
			<h3> 
				{children}
			</h3>
		)
	}

	return (
		<h1>
			{children}
		</h1>	
	)
}
