import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Container, Header, Form, Grid, Tab, Button, Checkbox } from 'semantic-ui-react';
import { every, values, isString, forOwn, set } from 'lodash';
import * as UserActions from '../../actions/user';

import { history } from '../../helpers/history';
import DropZoneCropper from '../../components/DropZoneCropper';
import GalleryUploader from '../../components/GalleryUploader';

const emptyCompany = {
	ico: '',
	dic: '',
	address: '',
	city: '',
	icDph: '',
	zip: ''
};

const emptyUser = {
	id: -1,
	name: '',
	surname: '',
	confirmed: false,
	activated: false,
	email: '',
	photo: '',
	phone: '',
	company: { ...emptyCompany }
};

const emptyState = {
	formValues: {
		...emptyUser
	},
	formErrors: {
		company: {}
	},
	fields: {
		name: true,
		surname: true,
		confirmed: true,
		email: true,
		photo: true,
		phone: true,
		activated: true,
		company: {
			ico: true,
			dic: true,
			address: true,
			city: true,
			icDph: true,
			zip: true
		}
	}
};

class UserDetailContainer extends React.Component {
	static propTypes = {
		id: PropTypes.PropTypes.number.isRequired,
		a: PropTypes.shape({
			loadUser: PropTypes.func.isRequired,
			updateUser: PropTypes.func.isRequired
		}).isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			...emptyState
		};
	}

	componentDidMount() {
		if (!this.props.id) {
			history.push('/users');
			return;
		}

		this.setLoading(true);
		this.props.a.loadUser(this.props.id, (user) => {
			this.setLoading(false);
			if (!user) {
				history.push('/users');
			} else {
				this.setState({ ...emptyState, formValues: { ...user } }, this.revalidate);
			}
		});
	}

	setLoading = (loading) => {
		this.setState({ loading });
	}

	validateField = (fieldName, value) => {
		const { formErrors, fields } = this.state;

		let valid = false;
		switch (fieldName) {
		case 'name':
		case 'surname':
			valid = value && isString(value) && value.length > 0;
			formErrors[fieldName] = valid ? '' : `${fieldName} cannot be empty`;
			fields[fieldName] = valid;
			break;
		case 'company.ico':
			valid = value && isString(value);
			set(formErrors, fieldName, valid ? '' : `${fieldName} cannot be empty`);
			set(fields, fieldName, valid);
			break;
		default:
			break;
		}
		this.setState({
			formErrors,
			fields
		});
	}

	handleChange = (e, { name, value }) => {
		const temp = { ...this.state.formValues };
		set(temp, name, value);
		this.setState(
			{ formValues: temp },
			() => { this.validateField(name, value); }
		);
	}

	isValid = () => {
		let userValid = true;
		let companyValid = true;
		forOwn(this.state.fields, (value, key) => {
			if (key !== 'company' && userValid) {
				userValid = value;
			}
		});

		forOwn(this.state.fields.company, (value) => {
			if (companyValid) {
				companyValid = value;
			}
		});

		return userValid && companyValid;
	}

	revalidate = () => {
		forOwn(this.state.formValues, (value, key) => {
			this.validateField(key, value);
		});
		forOwn(this.state.formValues.company, (value, key) => {
			this.validateField(`company.${key}`, value);
		});
	};

	handleSubmit = () => {
		this.revalidate();
		if (this.isValid()) {
			this.setLoading(true);

			this.props.a.updateUser(this.state.formValues, () => {
				this.setLoading(false);
			});
		}
	}

	profilePhotoChanged = (newPhoto) => {
		this.handleChange(null, { name: 'photo', value: newPhoto });
	}

	galleryChanged = (images) => {
		console.log('Images changed', images);
	}

	render() {
		const cropperOptions = {
			image: this.state.formValues.photo || 'none',
			imageChanged: this.profilePhotoChanged
		};

		const userPanel = (
			<Tab.Pane>
				<Grid>
					<Grid.Column mobile={16} tablet={16} computer={12}>
						<Form.Group widths="equal">
							<Form.Input
								fluid
								placeholder="Name"
								name="name"
								onChange={this.handleChange}
								value={this.state.formValues.name}
								error={!this.state.fields.name}
								label={this.state.formErrors.name || 'Name'}
							/>
							<Form.Input
								fluid
								placeholder="Surname"
								name="surname"
								onChange={this.handleChange}
								value={this.state.formValues.surname}
								error={!this.state.fields.surname}
								label={this.state.formErrors.surname || 'Surname'}
							/>
						</Form.Group>

						<Form.Group widths="equal">
							<Form.Input
								fluid
								placeholder="Email"
								name="email"
								onChange={this.handleChange}
								value={this.state.formValues.email}
								error={!this.state.fields.email}
								label={this.state.formErrors.email || 'Email'}
							/>
							<Form.Input
								fluid
								placeholder="Phone"
								name="phone"
								onChange={this.handleChange}
								value={this.state.formValues.phone}
								error={!this.state.fields.phone}
								label={this.state.formErrors.phone || 'Phone'}
							/>
						</Form.Group>

						<Form.Field>
							<Checkbox
								toggle
								label="Confirmed "
								name="confirmed"
								onChange={(e, el) => this.handleChange(e, { name: el.name, value: el.checked })}
								checked={this.state.formValues.confirmed}
							/>
						</Form.Field>
						<Form.Field>
							<Checkbox
								toggle
								label="Activated "
								name="activated"
								onChange={(e, el) => this.handleChange(e, { name: el.name, value: el.checked })}
								checked={this.state.formValues.activated}
							/>
						</Form.Field>
					</Grid.Column>
					<Grid.Column mobile={16} tablet={16} computer={4}>
						<Form.Field>
							<label htmlFor="user-photo">Photo:
								<DropZoneCropper id="user-photo" {...cropperOptions} />
							</label>
						</Form.Field>
					</Grid.Column>
				</Grid>
			</Tab.Pane>
		);

		const companyPanel = (
			<Tab.Pane>
				<Grid>
					<Grid.Column mobile={16} tablet={8} computer={8}>
						<Form.Input
							fluid
							placeholder="Ico"
							onChange={(e, el) => this.handleChange(e, { name: 'company.ico', value: el.value })}
							value={this.state.formValues.company.ico}
							error={!this.state.fields.company.ico}
							label={this.state.formErrors.company.ico || 'Ico'}
						/>
						<Form.Input
							fluid
							placeholder="Dic"
							onChange={(e, el) => this.handleChange(e, { name: 'company.dic', value: el.value })}
							value={this.state.formValues.company.dic}
							error={!this.state.fields.company.dic}
							label={this.state.formErrors.company.dic || 'Dic'}
						/>
						<Form.Input
							fluid
							placeholder="IcDph"
							onChange={(e, el) => this.handleChange(e, { name: 'company.icDph', value: el.value })}
							value={this.state.formValues.company.icDph}
							error={!this.state.fields.company.icDph}
							label={this.state.formErrors.company.icDph || 'IcDph'}
						/>
					</Grid.Column>
					<Grid.Column mobile={16} tablet={8} computer={8}>
						<Form.Input
							fluid
							placeholder="address"
							onChange={(e, el) => this.handleChange(e, { name: 'company.address', value: el.value })}
							value={this.state.formValues.company.address}
							error={!this.state.fields.company.address}
							label={this.state.formErrors.company.address || 'Address'}
						/>
						<Form.Input
							fluid
							placeholder="City"
							onChange={(e, el) => this.handleChange(e, { name: 'company.city', value: el.value })}
							value={this.state.formValues.company.city}
							error={!this.state.fields.company.city}
							label={this.state.formErrors.company.city || 'City'}
						/>
						<Form.Input
							fluid
							placeholder="Zip"
							onChange={(e, el) => this.handleChange(e, { name: 'company.zip', value: el.value })}
							value={this.state.formValues.company.zip}
							error={!this.state.fields.company.zip}
							label={this.state.formErrors.company.zip || 'ZIP'}
						/>
					</Grid.Column>
				</Grid>
			</Tab.Pane>
		);


		const galleryPanel = (
			<Tab.Pane>
				<GalleryUploader id="user-gallery" images={[]} handleChange={this.galleryChanged} />
			</Tab.Pane>
		);

		const panes = [
			{ menuItem: 'Profile Data', render: () => userPanel },
			{ menuItem: 'Company', render: () => companyPanel },
			{ menuItem: 'Gallery', render: () => galleryPanel }
		];

		return (
			<Container>
				<Helmet title="User" />
				<Form loading={this.state.loading}>
					<Header as="h1" floated="left">Edit user</Header>
					<Button floated="right" onClick={() => this.handleSubmit()}>Save</Button>
					<Tab panes={panes} />
				</Form>
			</Container>
		);
	}
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
	a: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailContainer);
