import React from "react"
import {Route, Routes} from "react-router-dom"
import {MainLayout} from "../../layouts/Main"
import {Home, Me, Favorite, AddTrack} from "../../pages"


export const AuthRoutes: React.FC = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="" element={<Home />} />
					<Route path="me/" element={<Me />} />
					<Route path="favorite/" element={<Favorite />} />
					<Route path="add-track/" element={<AddTrack />} />
				</Route>
			</Routes>
		</>
	)
}
