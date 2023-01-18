import { BrowserRouter as Router, Route, Routes as R } from "react-router-dom";

import routes from "./routes";

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
