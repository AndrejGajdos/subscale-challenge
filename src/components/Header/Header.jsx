import React from 'react';
import { LOGGED_USER } from '../../apollo/client';
import { useQuery } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/react-hooks';
import { deleteUser } from '../../utils/manageTokens';

export function Header() {
	const client = useApolloClient();
	const { data } = useQuery(LOGGED_USER);

	const handleLogout = () => {
		deleteUser();
		client.writeData({
			data: {
				loggedEmail: null,
			},
		});
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<span className="navbar-brand mb-0 h1">Subscale</span>
			{data?.loggedEmail && (
				<div className="d-flex align-items-center">
					<span className="navbar-text p-0">{data?.loggedEmail}</span>
					<button
						type="button"
						className="btn btn-outline-dark ml-3"
						onClick={() => handleLogout()}
					>
						Logout
					</button>
				</div>
			)}
		</nav>
	);
}
