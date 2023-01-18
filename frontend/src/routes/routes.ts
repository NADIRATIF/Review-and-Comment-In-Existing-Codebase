import React from "react";

import PublicLayout from "../layouts/PublicLayout";
import FullLayout from "../layouts/FullLayout";

import SIgnInPage from "../pages/Auth/SignIn";
import SIgnUpPage from "../pages/Auth/SignUp";

import DashboardPage from "../pages/Dashboard";

interface IRoute {
	path: string,
	name: string,
	Component: React.FC,
	Layout: React.FC
}

const routes: IRoute[] = [
	{ path: "/auth/sign-in", name: "SIgnIn", Component: SIgnInPage, Layout: PublicLayout },
	{ path: "/auth/sign-up", name: "SignUp", Component: SIgnUpPage, Layout: PublicLayout },
	{ path: "/dashboard", name: "Dashboard", Component: DashboardPage, Layout: FullLayout },
];

export default routes;
