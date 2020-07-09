import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export const ImgCell = ({ thumbnail }) => (
	<Zoom>
		<img src={thumbnail} width={30} height={30} alt="part" />
	</Zoom>
);
