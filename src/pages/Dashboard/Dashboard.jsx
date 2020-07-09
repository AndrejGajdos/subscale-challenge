import React, { useState, useEffect, useRef } from 'react';
import Table, { AutoResizer } from 'react-base-table';
import 'react-base-table/styles.css';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { SORT_ORDER, DEFAULT_SORT, COLUMNS } from './constants';
import { FileRow } from './FileRow';
import { TableContainer } from './DashBoardStyles';

const GET_DATA = gql`
	query Result {
		parts {
			nodes {
				id
				label
				description
				createdAt
				files {
					nodes {
						id
						partId
						basename
						createdAt
					}
				}
			}
		}
	}
`;

export function Dashboard() {
	const _isMounted = useRef(true);
	const { loading, error, data } = useQuery(GET_DATA);

	const [tableData, setTableData] = useState({
		data: [],
		sortBy: DEFAULT_SORT,
	});

	useEffect(() => {
		if (!loading && !error && data) {
			if (data?.parts?.nodes) {
				data.parts.nodes.forEach((dataItem) => {
					dataItem.rowKey = `part-${dataItem.id}`;
					dataItem.thumbnail = `https://subscale.xyz/static/thumbnails/${dataItem.id}-${dataItem.label}.png`;
					// BaseTable component requires children elements in ".children" object property
					if (dataItem?.files?.nodes) {
						dataItem.children = [...dataItem.files.nodes];
						delete dataItem.files;
					}
					// BaseTable component doesn't like if children elements have the same id as some parent elements
					dataItem.children.forEach((file) => {
						file.rowKey = `file-${file.id}`;
						file.fileId = file.id;
						file.id = file.rowKey;
					});
				});
				if (_isMounted.current) {
					setTableData((prev) => ({
						...prev,
						data: data.parts.nodes,
					}));
				}
			}
		}
	}, [data, loading, error]);

	useEffect(() => {
		return () => {
			_isMounted.current = false;
		};
	}, []);

	const onColumnSort = (sortBy) => {
		const order = sortBy.order === SORT_ORDER.ASC ? 1 : -1;
		const data = [...tableData.data];
		data.sort((a, b) => (a[sortBy.key] > b[sortBy.key] ? order : -order));
		if (_isMounted.current) {
			setTableData({
				sortBy,
				data,
			});
		}
	};

	const rowRenderer = ({ rowData, cells }) => {
		if (rowData.partId) return <FileRow rowData={rowData} />;
		return cells;
	};

	if (loading) return <p>Loading ...</p>;

	return (
		<TableContainer>
			<AutoResizer>
				{({ width, height }) => (
					<Table
						expandColumnKey={COLUMNS[0].key}
						columns={COLUMNS}
						data={tableData.data}
						sortBy={tableData.sortBy}
						width={width}
						height={height}
						onColumnSort={onColumnSort}
						rowRenderer={rowRenderer}
					/>
				)}
			</AutoResizer>
			<pre>
				Error:{' '}
				{error?.graphQLErrors?.map(({ message }, i) => (
					<span key={i}>{message}</span>
				))}
			</pre>
		</TableContainer>
	);
}
