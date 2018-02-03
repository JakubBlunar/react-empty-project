import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';
import { Button, Card, Image, Dimmer, Loader } from 'semantic-ui-react';
import { postReq } from '../helpers/request';

class DropZoneCropper extends Component {
	static propTypes = {
		image: PropTypes.string.isRequired,
		imageChanged: PropTypes.func.isRequired,
		location: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props);

		const baseImage = props.image === 'none' ? null : props.image;
		this.state = {
			image: baseImage,
			baseImage,
			edit: false,
			loading: false
		};
	}

	componentWillReceiveProps = (nextProps) => {
		const baseImage = nextProps.image === 'none' ? null : nextProps.image;
		this.setState({
			image: baseImage,
			baseImage
		});
	}

	onDrop = (files) => {
		this.setState({ image: files[0].preview });
	}

	setLoading = (loading) => {
		this.setState({
			loading
		});
	}

	save = () => {
		if (!this.state.image) {
			return this.setState({
				image: null,
				baseImage: null,
				edit: false
			}, this.props.imageChanged(null));
		}

		return this.cropper.getCroppedCanvas().toBlob((blob) => {
			const formData = new FormData();
			formData.append('image', blob);
			this.setLoading(true);
			postReq(this.props.location, null, formData, (err, res) => {
				this.setLoading(false);
				if (err) {
					toast.error('Error while saving picture.');
					return;
				}

				const { image, success } = res;
				if (success) {
					this.setState({
						image,
						baseImage: image,
						edit: false
					}, this.props.imageChanged(image));
				} else {
					toast.error('Error while saving picture.');
				}
			});
		});
	}

	startEdit = () => {
		this.setState({ edit: true });
	}

	cancelEdit = () => {
		this.setState({ image: this.state.baseImage, edit: false });
	}

	removeFile = () => {
		this.setState({
			image: null
		});
	}

	handleChange = (e, { name, value }) => this.setState({ [name]: value });

	render() {
		const { scale, image, edit } = this.state;

		const dropzoneStyle = {
			display: this.state.image ? 'none' : 'block',
			minWidth: '100px',
			maxWidth: '100%',
			minHeight: '150px',
			maxHeight: '300px',
			borderWidth: '2px',
			borderColor: 'rgb(102, 102, 102)',
			borderStyle: 'dashed',
			borderRadius: '5px'
		};

		const cropperStyle = {
			display: this.state.image ? 'block' : 'none',
			minWidth: '100px',
			maxWidth: '100%',
			minHeight: '150px',
			maxHeight: '300px'
		};

		const dropzone = edit ? (
			<Dropzone onDrop={this.onDrop} accept="image/jpeg, image/png" style={dropzoneStyle}>
				Click or drop image here.
			</Dropzone>) : null;

		const cropper = edit ? (
			<Cropper
				ref={(c) => { this.cropper = c; }}
				src={image}
				style={cropperStyle}
				// Cropper.js options
				aspectRatio={1 / 1}
				guides
				autoCropArea={0.8}
				zoomTo={scale}
				dragMode="move"
				crop={this.crop}
				crossOrigin="Anonymous"
				restore
				responsive
			/>) : null;

		const saveButton = edit && image ?
			<Button size="mini" onClick={this.removeFile} color="red">Remove</Button> : null;

		const removeButton = edit ?
			<Button size="mini" onClick={this.save} color="green">Save</Button> : null;

		const editButton = !edit ?
			<Button size="mini" onClick={this.startEdit} color="green">Edit</Button> : null;

		const cancelButton = edit ?
			<Button size="mini" onClick={this.cancelEdit} color="orange">Cancel</Button> : null;

		return (
			<div>
				<Card fluid>
					<Dimmer active={this.state.loading}>
						<Loader>Loading</Loader>
					</Dimmer>
					<Card.Content>
						{!edit && <Image fluid src={image} />}
						{dropzone}
						{cropper}
					</Card.Content>
					<Card.Content extra>
						<div className="ui three buttons">
							{cancelButton}
							{saveButton}
							{removeButton}
							{editButton}
						</div>
					</Card.Content>
				</Card>
			</div>
		);
	}
}

export default DropZoneCropper;
