import React, { useCallback, useMemo, useState } from 'react';
import { FancyTableSort, FancyTableColumn, FancyTableRow, FancyTableProps } from './types';
import _ from 'lodash';

import Columns from './Columns';
import Rows from './Rows';

_.mixin({
	flatten: function (obj) {
		const _flatten = function (obj: object, prefix?: string) {
			const propName = prefix ? prefix + '.' : '';
			const ret = {};

			for (const attr in obj) {
				if (_.isArray(obj[attr])) {
					const len = obj[attr].length;
					ret[attr] = obj[attr].join(',');
				} else if (typeof obj[attr] === 'object') {
					_.extend(ret, _flatten(obj[attr], propName + attr));
				} else {
					ret[propName + attr] = obj[attr];
				}
			}

			return ret;
		};

		return _flatten(obj);
	},
});

const FancyTable: React.VFC<FancyTableProps> = ({ columns: _columns, rows: _rows = [], search = true, HeaderLeftComponent, HeaderRightComponent, ActionComponent }: FancyTableProps) => {
	const [filter, setFilter] = useState<string>('');
	const [sort, setSort] = useState<FancyTableSort>({});

	const columns = useMemo<FancyTableColumn[]>(() => {
		return _columns.map((column, index) => {
			column.key = column.key || column.data || `${index}`;
			column.style = column.style || {};

			return column as FancyTableColumn;
		});
	}, [_columns]);
	const rows = React.useMemo(() => {
		let rows = _rows.map((row) => ({
			id: _.uniqueId(),
			...row,
		}));

		if (filter) {
			rows = rows.filter((row) => {
				const values = _.values(_.flatten(row));
				return values.join('').toLowerCase().indexOf(filter.toLowerCase()) >= 0;
			});
		}

		if (sort && _.some(sort, (v, k) => !!v)) {
			const filtered = _.pickBy(sort, (v, k) => !!v);
			rows = _.orderBy(rows, _.keys(filtered).reverse(), _.values(filtered).reverse());
		}

		// if (paging) {
		// 	rows = _.slice(rows, page * pageLength, (page * pageLength) + pageLength);
		// }

		return rows;
	}, [_rows, filter, sort]);

	const onSearchChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
		setFilter(e.currentTarget.value);
	}, []);

	const onSortChange = useCallback((column: FancyTableColumn) => {
		return () => {
			setSort((sort) => {
				if (sort[column.key] === 'asc') {
					sort[column.key] = 'desc';
				} else if (sort[column.key] === 'desc') {
					delete sort[column.key];
				} else {
					sort[column.key] = 'asc';
				}

				return {
					...sort,
				};
			});
		};
	}, []);

	return (
		<div className="react-fancy-table">
			{(search || HeaderLeftComponent || HeaderRightComponent || ActionComponent) && (
				<div className="react-fancy-table-header">
					{HeaderLeftComponent}
					<div className="react-fancy-table-spacer" />
					{HeaderRightComponent}
					{search && (
						<div className="d-flex align-items-center mb-2 mb-md-0">
							<span className="text-muted mr-2">Search:</span>
							<input value={filter} onChange={onSearchChange} />
						</div>
					)}
					{ActionComponent}
				</div>
			)}

			{/* <Columns columns={columns} rows={rows} order={order} onOrder={handleColumnOrder} selected={selected} selector={selector} onSelectChange={handleSelectChange} /> */}
			<Columns columns={columns} sort={sort} setSort={onSortChange} />

			{/* {loading && ( */}
			{/*	<Card className="mb-2"> */}
			{/*		<CardBody className="d-flex flex-column justify-content-center align-items-center text-muted p-2"> */}
			{/*			<LoadingIcon /> */}
			{/*			<Translate id="components.table.loadingtext" /> */}
			{/*			... */}
			{/*		</CardBody> */}
			{/*	</Card> */}
			{/* )} */}

			{/* {!loading && _.isEmpty(rows) && ( */}
			{/*	<Card className="mb-2"> */}
			{/*		<CardBody className="d-flex justify-content-center text-muted p-2"> */}
			{/*			<Translate id="components.table.nodatatext" /> */}
			{/*		</CardBody> */}
			{/*	</Card> */}
			{/* )} */}

			<Rows columns={columns} rows={rows} />

			{/* {paging && ( */}
			{/*	<div className="d-flex flex-column flex-md-row align-items-center"> */}
			{/*		<div className="flex-1 text-left" /> */}
			{/*		<div className="flex-1 d-flex justify-content-center"> */}
			{/*			<Pages page={page} pages={pages} onChange={handlePageChange} /> */}
			{/*		</div> */}
			{/*		<div className="flex-1 text-right"> */}
			{/*			<PageLength pageLength={pageLength} onChange={handlePageLengthChange} /> */}
			{/*		</div> */}
			{/*	</div> */}
			{/* )} */}
		</div>
	);
};

export { FancyTable };
