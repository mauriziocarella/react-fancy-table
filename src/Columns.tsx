import React from 'react';
import classNames from 'classnames';
import { FancyTableColumn, FancyTableSort } from './types';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
	columns: FancyTableColumn[];
	sort: FancyTableSort;
	setSort: (column: FancyTableColumn) => any;
}

const Columns = ({ columns, className, sort, setSort }: Props) => {
	return (
		<div className={classNames('react-fancy-table-columns', className)}>
			{columns.map((column, index) => {
				return (
					<div
						key={index}
						className={classNames('react-fancy-table-column', column.className, {
							'react-fancy-table-column-sort-asc': sort[column.key] === 'asc',
							'react-fancy-table-column-sort-desc': sort[column.key] === 'desc',
						})}
						style={column.style}
						onClick={setSort(column)}
					>
						{column.title}
					</div>
				);
			})}
		</div>
	);
};

export default Columns;
