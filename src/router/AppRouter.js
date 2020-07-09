import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { LoginForm } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { HOME_URL, DASHBOARD_URL } from './urls';
import { LOGGED_USER } from '../apollo/client';
import { useQuery } from '@apollo/react-hooks';

const RequireAuth = ({ loggedEmail, children }) => {
	if (!loggedEmail) {
		return <Redirect to={HOME_URL} />;
	}
	return children;
};

export const AppRouter = () => {
	const { data } = useQuery(LOGGED_USER);
	return (
		<Router>
			<Switch>
				<Route
					exact
					path={HOME_URL}
					render={() =>
						data?.loggedEmail ? <Redirect to={DASHBOARD_URL} /> : <LoginForm />
					}
				/>
				<RequireAuth loggedEmail={data?.loggedEmail}>
					<Route path={DASHBOARD_URL}>
						<Dashboard />
					</Route>
				</RequireAuth>
			</Switch>
		</Router>
	);
};
