import React from 'react';

type FancyTableRow = any;

interface FancyTableColumn {
	key: string;
	title: string | React.ReactNode;
	data?: string;
	style?: React.CSSProperties;
	className?: string;
	render?: (row: FancyTableRow, value: any) => React.Component;
}

interface FancyTableProps {
	columns: Array<Omit<FancyTableColumn, 'key'> & { key?: string }>;
	rows?: Array<FancyTableRow>;
	search?: boolean;
	HeaderRightComponent?: React.Component;
	HeaderLeftComponent?: React.Component;
	ActionComponent?: React.Component;
}

interface FancyTableSort {
	[key: string]: 'asc' | 'desc';
}

export { FancyTableRow, FancyTableColumn, FancyTableSort, FancyTableProps };
