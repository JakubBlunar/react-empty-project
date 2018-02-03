import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { Card, Button, Image, Grid, Loader, Dimmer } from 'semantic-ui-react';
import { map } from 'lodash';
import { toast } from 'react-toastify';
import Sortable from 'react-anything-sortable';
import SortableItem from './SortableItem';
import { postReq } from '../helpers/request';


class GalleryUploader extends Component {
	static propTypes = {
		handleChange: PropTypes.func.isRequired,
		images: PropTypes.arrayOf(PropTypes.string).isRequired,
		imagesInRow: PropTypes.number,
		location: PropTypes.string.isRequired
	};

	static defaultProps = {
		imagesInRow: 5
	}

	constructor(props) {
		super(props);
		this.state = {
			images: props.images,
			loading: false
		};
	}

	onDrop = (pictures) => {
		const totalCount = pictures.length;
		let loaded = 0;
		this.setState({
			loaded,
			totalCount,
			loading: true
		});

		pictures.forEach((file, i) => {
			const formData = new FormData();
			formData.append(`image${i}`, file);
			this.setLoading(true);
			postReq(this.props.location, null, formData, (err, res) => {
				loaded += 1;
				this.setState({ loaded });
				if (err) {
					toast.error('Error while saving picture.');
					return;
				}

				const { image, success } = res;
				if (success) {
					this.setState(oldState => oldState.images.push(image));
				} else {
					toast.error('Error while saving picture.');
				}

				if (loaded >= totalCount) {
					this.setLoading(false);
					this.props.handleChange(this.state.images);
				}
			});
		});
	}

	setLoading = (loading) => {
		this.setState({
			loading
		});
	}

	removeImage = (index) => {
		const { images } = this.state;
		const imageUrl = images[index];
		const imageName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
		console.log('Removing', imageUrl, imageName);

		images.splice(index, 1);

		this.setState({
			images
		}, () => this.props.handleChange(this.state.images));
	}

	handleSort = (data) => {
		this.setState({
			images: data
		}, () => this.props.handleChange(this.state.images));
	}

	render() {
		const dropzoneStyle = {
			width: '100%',
			textAlign: 'center',
			minHeight: '75px',
			lineHeight: '75px'
		};
		const images = map(this.state.images, (e, i) => (
			<SortableItem key={i} sortData={e}>
				<Card>
					<Card.Content>
						<Image draggable={false} src={e} fluid />
					</Card.Content>
					<Card.Content extra>
						<Button fluid onClick={() => this.removeImage(i)} color="orange">Remove</Button>
					</Card.Content>
				</Card>
			</SortableItem>));

		const { loaded, totalCount } = this.state;
		return (
			<Grid>
				<Dimmer active={this.state.loading}>
					<Loader>Uploaded {loaded} of {totalCount}</Loader>
				</Dimmer>
				<Grid.Row>
					<Grid.Column computer={16} >
						<Card raised fluid>
							<Dropzone onDrop={this.onDrop} accept="image/jpeg, image/png" style={dropzoneStyle}>
								Click or drop images here.
							</Dropzone>
						</Card>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column computer={16} >
						<Card.Group
							as={Sortable}
							onSort={this.handleSort}
							dynamic
							doubling
							itemsPerRow={this.props.imagesInRow}
						>
							{images}
						</Card.Group>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default GalleryUploader;
