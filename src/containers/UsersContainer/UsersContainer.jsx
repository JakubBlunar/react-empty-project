import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { map, concat, sortedUniq, sortBy, debounce } from 'lodash';
import { Table, Pagination, Input, Container, Dropdown, Loader, Header, Button } from 'semantic-ui-react';
import { history } from '../../helpers/history';
import * as usersActions from '../../actions/users';
import UserTableRow from '../../components/UserTableRow';
import RemoveUserModal from '../../components/Modals/RemoveUserModal';

class UsersContainer extends React.Component {
	static propTypes = {
		userStore: PropTypes.shape({
			limit: PropTypes.number.isRequired,
			page: PropTypes.number.isRequired,
			users: PropTypes.array.isRequired,
			loading: PropTypes.bool.isRequired
		}).isRequired,
		actions: PropTypes.shape({
			reloadUsers: PropTypes.func.isRequired,
			changeLimit: PropTypes.func.isRequired,
			changePage: PropTypes.func.isRequired,
			changeSearch: PropTypes.func.isRequired
		}).isRequired
	};

	constructor(props) {
		super(props);

		const emptyUser = {
			id: -1,
			fullName: '',
			confirmed: false,
			email: ''
		};

		this.state = {
			removeModalOpen: false,
			userToRemove: { ...emptyUser },
			emptyUser
		};
	}

	componentDidMount() {
		this.props.actions.reloadUsers();
	}

	onChangePage = (event, data) => {
		if (this.props.userStore.page !== data.activePage) {
			this.props.actions.changePage(data.activePage);
		}
	};

	onChangeLimit = (event, data) => {
		if (this.props.userStore.limit !== data.value) {
			this.props.actions.changeLimit(data.value);
		}
	};

	onChangeSearch = (event, data) => {
		this.props.actions.changeSearch(data.value);
	};
	onChangeSearch = debounce(this.onChangeSearch, 300);


	openRemoveUserModal = (user) => {
		this.setState({
			removeModalOpen: true,
			userToRemove: user
		});
	};

	closeRemoveUserModal = (removed) => {
		if (removed) {
			this.props.actions.reloadUsers();
		}
		this.setState({
			removeModalOpen: false,
			userToRemove: { ...this.state.emptyUser }
		});
	}

	render() {
		const uStore = this.props.userStore;

		const limits = sortedUniq(sortBy(concat(10, 20, 50, 100, uStore.limit)), item => item);
		const limitOptions = map(limits, i =>
			({
				value: i,
				text: `Limit ${i}`
			}));

		let rows;
		if (!uStore.loading) {
			if (uStore.users.length > 0) {
				rows = map(uStore.users, (user, i) =>
					(<UserTableRow
						key={i}
						{...user}
						openRemoveModal={this.openRemoveUserModal}
					/>));
			} else {
				rows = (
					<Table.Row>
						<Table.Cell colSpan="5">
							No users found.
						</Table.Cell>
					</Table.Row>);
			}
		} else {
			rows = (
				<Table.Row>
					<Table.Cell colSpan="5">
						<Loader active inline="centered">Loading</Loader>
					</Table.Cell>
				</Table.Row>);
		}

		const pagination = uStore.pages < 2 ? null : (
			<Table.Row>
				<Table.HeaderCell colSpan="4">
					<Pagination
						defaultActivePage={uStore.page}
						totalPages={uStore.pages}
						onPageChange={this.onChangePage}
						ellipsisItem={null}
						firstItem={null}
						lastItem={null}
					/>
				</Table.HeaderCell>
			</Table.Row>
		);

		const removeModal = this.state.removeModalOpen ? (<RemoveUserModal
			open={this.state.removeModalOpen}
			user={this.state.userToRemove}
			close={this.closeRemoveUserModal}
		/>) : null;

		return (
			<Container>
				<Helmet title="Users" />
				<Header as="h1" floated="left">Users</Header>
				<Button floated="right" onClick={() => history.push('/user/create')}>Create User</Button>
				<Table structured selectable color="orange">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell colSpan="4">
								<Input
									icon="users"
									iconPosition="left"
									placeholder="Search for user..."
									fluid
									onChange={this.onChangeSearch}
									defaultValue={uStore.search}
								/>
							</Table.HeaderCell>
							<Table.HeaderCell colSpan="4">
								<Dropdown
									fluid
									selection
									options={limitOptions}
									defaultValue={uStore.limit}
									onChange={this.onChangeLimit}
								/>
							</Table.HeaderCell>
						</Table.Row>
						<Table.Row>
							<Table.HeaderCell />
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Email</Table.HeaderCell>
							<Table.HeaderCell>Company</Table.HeaderCell>
							<Table.HeaderCell />
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{rows}
					</Table.Body>

					<Table.Footer>
						{pagination}
					</Table.Footer>
				</Table>
				{removeModal}
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	userStore: state.userStore
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(usersActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
