import React from 'react';
import { Table, Icon, Popup, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';

import { history } from '../helpers/history';

const UsersTableRow = (props) => {
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

	const openProfile = () => history.push(`/user/${props.id}`);

	const avatar = <Avatar src={props.photo ? props.photo : null} name={props.fullName} size={40} />;

	return (
		<Table.Row>
			<Table.Cell onClick={() => openProfile()} collapsing>
				{label} {avatar}
			</Table.Cell>
			<Table.Cell onClick={() => openProfile()}>
				{props.confirmed && props.fullName}
			</Table.Cell>
			<Table.Cell onClick={() => openProfile()}>
				{props.email}
			</Table.Cell>
			<Table.Cell onClick={() => openProfile()}>
				{props.company.ico}
			</Table.Cell>
			<Table.Cell width="2">
				<Popup
					trigger={icon}
					content="Remove this user."
					position="bottom right"
				/>
			</Table.Cell>
		</Table.Row>
	);
};

UsersTableRow.propTypes = {
	openRemoveModal: PropTypes.func.isRequired,
	fullName: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	confirmed: PropTypes.bool.isRequired,
	activated: PropTypes.bool.isRequired,
	photo: PropTypes.string,
	id: PropTypes.number.isRequired,
	company: PropTypes.shape({
		ico: PropTypes.string.isRequired
	}).isRequired
};

UsersTableRow.defaultProps = {
	photo: null
};

export default UsersTableRow;
