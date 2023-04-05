import React from "react";
import { Outlet } from "react-router-dom";

export const EmptyLayout: React.FC = () => {
	return (
		<div className="empty-layout">
			<Outlet />
		</div>
	);
};
