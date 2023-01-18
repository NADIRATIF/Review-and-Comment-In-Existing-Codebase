import { BrowserRouter as Router, Route, Routes as R } from "react-router-dom";

import routes from "./routes";

/**
 * Routes component to render all routes in the application
 * @returns {JSX.Element}
 */
const Routes = () => {
	return (
		<Router>
			<R>
				{routes.map(({ path, Component, Layout }) => (
					<Route
						path={path}
						key={path}
						element={
							<Layout>
								<Component />
							</Layout>
						}
					/>

				))}
			</R>
		</Router>
	);
};

export default Routes;
