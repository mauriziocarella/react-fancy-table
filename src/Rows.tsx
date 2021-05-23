import React from 'react';
import { FancyTableColumn, FancyTableRow } from './types';
import classNames from 'classnames';
import _ from 'lodash';

interface RowProps extends React.ComponentPropsWithoutRef<'div'> {
	columns: FancyTableColumn[];
	row: FancyTableRow;
}
interface RowsProps extends React.ComponentPropsWithoutRef<'div'> {
	columns: FancyTableColumn[];
	rows: FancyTableRow[];
}

const Row = ({ columns, row, className }: RowProps) => {
	return (
		<div className="react-fancy-table-row">
			{columns.map((column) => (
				<div key={column.key} className={classNames('react-fancy-table-column', column.className)} style={column.style}>
					{typeof column.render === 'function' && column.data ? column.render(row, _.get(row, column.data)) : column.data ? _.get(row, column.data) : ''}
				</div>
			))}
		</div>
	);
};

const Rows = ({ columns, rows, className, ...props }: RowsProps) => {
	return (
		<div className="react-fancy-table-rows" {...props}>
			{rows.map((row) => (
				<Row key={row.id} columns={columns} row={row} />
			))}
		</div>
	);
};

export default Rows;
