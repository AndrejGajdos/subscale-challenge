import React from 'react';
import { dateFormat } from '../../utils/formatters';
import { ImgCell } from './ImgCell';
import { LongTextCell } from './LongTextCell';
import { Column } from 'react-base-table';

export const SORT_ORDER = {
	ASC: 'asc',
};

export const DEFAULT_SORT = { key: 'name', order: SORT_ORDER.ASC };

export const COLUMNS = [
	{
		key: 'thumbnail',
		title: 'Thumbnail',
		dataKey: 'thumbnail',
		width: 120,
		resizable: true,
		align: Column.Alignment.CENTER,
		cellRenderer: ({ cellData: thumbnail }) => (
			<ImgCell thumbnail={thumbnail}></ImgCell>
		),
		sortable: false,
	},
	{
		key: 'id',
		title: 'Id',
		dataKey: 'id',
		width: 40,
		resizable: true,
		sortable: true,
		align: Column.Alignment.LEFT,
	},
	{
		key: 'label',
		title: 'Label',
		dataKey: 'label',
		width: 150,
		resizable: true,
		align: Column.Alignment.CENTER,
		sortable: true,
		cellRenderer: ({ cellData }) => <LongTextCell>{cellData}</LongTextCell>,
	},
	{
		key: 'description',
		title: 'Description',
		dataKey: 'description',
		width: 300,
		align: Column.Alignment.LEFT,
		resizable: true,
		sortable: true,
		cellRenderer: ({ cellData }) => <LongTextCell>{cellData}</LongTextCell>,
	},
	{
		key: 'created',
		title: 'Created',
		dataKey: 'createdAt',
		width: 170,
		resizable: true,
		align: Column.Alignment.LEFT,
		sortable: true,
		cellRenderer: ({ cellData }) => (
			<LongTextCell>{dateFormat(cellData)}</LongTextCell>
		),
	},
];
