import React from 'react';
import { dateFormat } from '../../../utils/formatters';
import {
	FileRowContainer,
	IdCell,
	BaseNameCell,
	CreatedAtCell,
} from './FileRowStyles';
import { LongTextCell } from '../LongTextCell';

export const FileRow = ({ rowData }) => (
	<FileRowContainer key={rowData.fileId}>
		<IdCell>
			<LongTextCell>{rowData.fileId}</LongTextCell>
		</IdCell>
		<BaseNameCell>
			<LongTextCell>{rowData.basename}</LongTextCell>
		</BaseNameCell>
		<CreatedAtCell>
			<LongTextCell>{dateFormat(rowData.createdAt)}</LongTextCell>
		</CreatedAtCell>
		<span>
			<LongTextCell>
				<a href={`https://subscale.xyz/static/files/${rowData.basename}`}>
					DOWNLOAD
				</a>
			</LongTextCell>
		</span>
	</FileRowContainer>
);
