import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
	saveUser,
	LOGGED_USER_EMAIL,
	LOGGED_USER_TOKEN,
} from '../../utils/manageTokens';
import { useApolloClient } from '@apollo/react-hooks';
import { Form } from './LoginStyles';

export function LoginForm() {
	const client = useApolloClient();
	const [loginFailed, setLoginFailed] = useState(false);
	const [loginDetails, setLoginDetails] = useState({
		email: '',
		password: '',
	});

	const [login] = useMutation(gql`
		mutation Authenticate($email: String!, $password: String!) {
			authenticate(input: { email: $email, password: $password }) {
				jwtToken
			}
		}
	`);

	const handleInputFocus = () => {
		setLoginFailed(false);
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setLoginDetails((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const submitLogin = async (e) => {
		e.preventDefault();
		const { data } = await login({ variables: loginDetails });
		if (data?.authenticate?.jwtToken) {
			saveUser({
				[LOGGED_USER_EMAIL]: loginDetails.email,
				[LOGGED_USER_TOKEN]: data.authenticate.jwtToken,
			});
			client.writeData({
				data: {
					loggedEmail: loginDetails.email,
				},
			});
		}
		if (data?.authenticate?.jwtToken === null) {
			setLoginFailed(true);
		}
	};

	return (
		<Form onSubmit={(e) => submitLogin(e)} className="bg-light p-4">
			<h2 className="text-center mb-3">Log in</h2>
			<div className="form-group">
				<input
					type="email"
					name="email"
					id="email"
					className="form-control"
					placeholder="Email"
					required
					onChange={(event) => handleInputChange(event)}
					onFocus={() => handleInputFocus()}
				/>
			</div>
			<div className="form-group">
				<input
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					className="form-control"
					required
					onChange={(event) => handleInputChange(event)}
					onFocus={() => handleInputFocus()}
				/>
			</div>
			<button type="submit" className="btn btn-primary w-100 mb-3">
				Submit
			</button>
			{loginFailed && (
				<div className="alert alert-danger mb-0" role="alert">
					Login failed :(
				</div>
			)}
		</Form>
	);
}
