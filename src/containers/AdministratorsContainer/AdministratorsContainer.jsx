import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { map, concat, sortedUniq, sortBy, debounce } from 'lodash';
import { Table, Pagination, Input, Container, Dropdown, Loader, Header } from 'semantic-ui-react';

import * as administratorsActions from '../../actions/administrators';
import AdministratorsTableRow from '../../components/AdministratorsTableRow';
import InviteAdminModal from '../../components/Modals/InviteAdminModal';
import RemoveAdminModal from '../../components/Modals/RemoveAdminModal';
import EditAdminModal from '../../components/Modals/EditAdminModal';

class AdministratorsContainer extends React.Component {
	static propTypes = {
		authStore: PropTypes.shape({
			user: PropTypes.shape({
				id: PropTypes.number.isRequired
			}).isRequired
		}).isRequired,
		administratorsStore: PropTypes.shape({
			limit: PropTypes.number.isRequired,
			page: PropTypes.number.isRequired,
			administrators: PropTypes.array.isRequired,
			loading: PropTypes.bool.isRequired
		}).isRequired,
		actions: PropTypes.shape({
			reloadAdministrators: PropTypes.func.isRequired,
			changeLimit: PropTypes.func.isRequired,
			changePage: PropTypes.func.isRequired,
			changeSearch: PropTypes.func.isRequired
		}).isRequired
	};

	constructor(props) {
		super(props);

		const emptyAdmin = {
			id: -1,
			fullName: '',
			name: '',
			surname: '',
			confirmed: false,
			email: ''
		};

		this.state = {
			removeModalOpen: false,
			editModalOpen: false,
			adminToRemove: { ...emptyAdmin },
			adminToEdit: { ...emptyAdmin },
			emptyAdmin
		};
	}

	componentDidMount() {
		this.props.actions.reloadAdministrators();
	}

	onChangePage = (event, data) => {
		if (this.props.administratorsStore.page !== data.activePage) {
			this.props.actions.changePage(data.activePage);
		}
	};

	onChangeLimit = (event, data) => {
		if (this.props.administratorsStore.limit !== data.value) {
			this.props.actions.changeLimit(data.value);
		}
	};

	onChangeSearch = (event, data) => {
		this.props.actions.changeSearch(data.value);
	};
	onChangeSearch = debounce(this.onChangeSearch, 300);


	openRemoveAdministratorModal = (admin) => {
		this.setState({
			removeModalOpen: true,
			adminToRemove: admin
		});
	};

	closeRemoveAdministratorModal = (removed) => {
		if (removed) {
			this.props.actions.reloadAdministrators();
		}
		this.setState({
			removeModalOpen: false,
			adminToRemove: { ...this.state.emptyAdmin }
		});
	}

	openEditAdministratorModal = (admin) => {
		this.setState({
			editModalOpen: true,
			adminToEdit: { ...admin }
		});
	};

	closeEditAdministratorModal = (removed) => {
		if (removed) {
			this.props.actions.reloadAdministrators();
		}
		this.setState({
			editModalOpen: false,
			adminToEdit: { ...this.state.emptyAdmin }
		});
	}

	render() {
		const aStore = this.props.administratorsStore;

		const limits = sortedUniq(sortBy(concat(10, 20, 50, 100, aStore.limit)), item => item);
		const limitOptions = map(limits, i =>
			({
				value: i,
				text: `Limit ${i}`
			}));

		let rows;
		if (!aStore.loading) {
			if (aStore.administrators.length > 0) {
				rows = map(aStore.administrators, (admin, i) =>
					(<AdministratorsTableRow
						key={i}
						{...admin}
						openRemoveModal={this.openRemoveAdministratorModal}
						openEditModal={this.openEditAdministratorModal}
						canRemove={this.props.authStore.user.id !== admin.id}
					/>));
			} else {
				rows = (
					<Table.Row>
						<Table.Cell colSpan="3">
							No administrator found.
						</Table.Cell>
					</Table.Row>);
			}
		} else {
			rows = (
				<Table.Row>
					<Table.Cell colSpan="3">
						<Loader active inline="centered">Loading</Loader>
					</Table.Cell>
				</Table.Row>);
		}

		const pagination = aStore.pages < 2 ? null : (
			<Table.Row>
				<Table.HeaderCell colSpan="3">
					<Pagination
						defaultActivePage={aStore.page}
						totalPages={aStore.pages}
						onPageChange={this.onChangePage}
						ellipsisItem={null}
						firstItem={null}
						lastItem={null}
					/>
				</Table.HeaderCell>
			</Table.Row>
		);

		const removeModal = this.state.removeModalOpen ? (<RemoveAdminModal
			open={this.state.removeModalOpen}
			admin={this.state.adminToRemove}
			close={this.closeRemoveAdministratorModal}
		/>) : null;

		const editModal = this.state.editModalOpen ? (<EditAdminModal
			open={this.state.editModalOpen}
			admin={this.state.adminToEdit}
			close={this.closeEditAdministratorModal}
		/>) : null;

		return (
			<Container>
				<Helmet title="Administrators" />
				<Header as="h1" floated="left">Administrators</Header>
				<InviteAdminModal reloadAdministrators={() => this.props.actions.reloadAdministrators()} />
				<Table structured selectable color="orange">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell colSpan="2">
								<Input
									icon="users"
									iconPosition="left"
									placeholder="Search for administrator..."
									fluid
									onChange={this.onChangeSearch}
									defaultValue={aStore.search}
								/>
							</Table.HeaderCell>
							<Table.HeaderCell colSpan="1">
								<Dropdown
									fluid
									selection
									options={limitOptions}
									defaultValue={aStore.limit}
									onChange={this.onChangeLimit}
								/>
							</Table.HeaderCell>
						</Table.Row>
						<Table.Row>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Email</Table.HeaderCell>
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
				{editModal}
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	administratorsStore: state.administratorsStore,
	authStore: state.authStore
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(administratorsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdministratorsContainer);
