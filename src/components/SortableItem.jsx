/* eslint-disable */
import React from 'react';
import createReactClass from 'create-react-class';
import { SortableItemMixin, SortableContainer } from 'react-anything-sortable';

export default createReactClass({
	mixins: [SortableItemMixin],
	render: function () {
		return this.renderWithSortable(
			<SortableContainer {...this.props}>	
				{this.props.children}
			</SortableContainer>);
	}
});
