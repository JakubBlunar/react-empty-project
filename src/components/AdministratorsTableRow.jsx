import React from 'react';
import { Table, Icon, Popup, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const AdministratorsTableRow = (props) => {
	let label = !props.confirmed ? (<Label ribbon color="orange">Non Confirmed</Label>) : null;
	if (!label) {
		label = !props.activated ? (<Label ribbon color="red">Deactivated</Label>) : null;
	}
	const icon = (
		<Icon
			onClick={() => props.openRemoveModal({
				...props
			})}
			name="trash outline"
		/>
	);

	const remove = props.canRemove ? (<Popup
		trigger={icon}
		content="Remove this administrator."
		position="bottom right"
	/>) : null;

	const openEdit = () => props.openEditModal({ ...props });
	return (
		<Table.Row>
			<Table.Cell onClick={openEdit}>
				{label} {props.confirmed && props.fullName}
			</Table.Cell>
			<Table.Cell onClick={openEdit}>{props.email}</Table.Cell>
			<Table.Cell width="2">
				{remove}
			</Table.Cell>
		</Table.Row>
	);
};

AdministratorsTableRow.propTypes = {
	openRemoveModal: PropTypes.func.isRequired,
	openEditModal: PropTypes.func.isRequired,
	fullName: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	confirmed: PropTypes.bool.isRequired,
	activated: PropTypes.bool.isRequired,
	canRemove: PropTypes.bool.isRequired
};

export default AdministratorsTableRow;
