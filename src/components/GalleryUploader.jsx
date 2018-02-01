import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { Card, Button, Image, Grid } from 'semantic-ui-react';
import { map } from 'lodash';


class GalleryUploader extends Component {
	static propTypes = {
		handleChange: PropTypes.func.isRequired,
		images: PropTypes.arrayOf(PropTypes.string).isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			images: props.images
		};
	}

	onDrop = (pictures) => {
		pictures.forEach((file) => {
			this.setState(oldState => oldState.images.push(file.preview));
		});

		this.props.handleChange(this.state.images);
	}

	removeImage = (index) => {
		const { images } = this.state;
		images.splice(index, 1);

		this.setState({
			images
		}, () => this.props.handleChange(this.state.images));
	}

	render() {
		const dropzoneStyle = {
			width: '100%',
			textAlign: 'center',
			minHeight: '75px'
		};
		const images = map(this.state.images, (e, i) => (
			<Card key={i}>
				<Card.Content>
					<Image src={e} fluid />
				</Card.Content>
				<Card.Content extra>
					<Button fluid onClick={() => this.removeImage(i)} color="orange">Remove</Button>
				</Card.Content>
			</Card>));

		return (
			<Grid>
				<Grid.Row>
					<Grid.Column computer={16} >
						<Card raised fluid>
							<Dropzone onClick={this.handleClick} onDrop={this.onDrop} accept="image/jpeg, image/png" style={dropzoneStyle}>
								Click or drop images here.
							</Dropzone>
						</Card>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column computer={16} >
						<Card.Group itemsPerRow={5} doubling>
							{images}		
						</Card.Group>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default GalleryUploader;
