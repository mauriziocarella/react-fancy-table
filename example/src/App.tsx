import React from "react";

import { FancyTable } from "react-fancy-table";
import "react-fancy-table/dist/index.css"
import "react-fancy-table/dist/themes/bootstrap.css"

import users from './data/users.json';

const App = () => {
	return (
		<div className="container py-3">
			<FancyTable
				columns={[
					{
						title: 'Name',
						data: 'name'
					},
					{
						title: 'Address',
						data: 'address.street'
					}
				]}
				rows={users}
			/>
		</div>
	);
};

export default App;
