import styled from 'styled-components';

export const FileRowContainer = styled.div`
	display: flex;
	padding-left: 15px;

	& > * + * {
		margin-left: 10px;
		padding-left: 10px;
		border-left: 1px solid black;
	}
`;

export const IdCell = styled.span`
	flex: 50px 0 0;
`;

export const BaseNameCell = styled.span`
	flex: 150px 0 0;
`;

export const CreatedAtCell = styled.span`
	flex: 150px 0 0;
`;
