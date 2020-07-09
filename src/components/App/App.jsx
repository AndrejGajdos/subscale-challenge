import React from 'react';
import { AppRouter } from '../../router/AppRouter';
import { Header } from '../Header';
import { LayoutContainer } from './AppStyles';

export function App() {
	return (
		<LayoutContainer className="d-flex flex-column">
			<Header />
			<div className="d-flex justify-content-center align-items-center flex-grow-1 flex-shrink-1">
				<AppRouter />
			</div>
		</LayoutContainer>
	);
}
