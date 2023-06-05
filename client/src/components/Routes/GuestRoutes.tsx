import React from "react"
import {Route, Routes} from "react-router-dom"

import {EmptyLayout} from "../../layouts/Empty"
import {MainLayout} from "../../layouts/Main"

import {Login, Register, Home} from "../../pages"


export const GuestRoutes: React.FC = () => {
	return (
    <>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="" element={<Home />} />
				</Route>
					<Route path="/auth" element={<EmptyLayout />}>
						<Route path="login/" element={<Login />} />
						<Route path="register/" element={<Register />} />
					</Route>
				</Routes>
    </>
	)
}
