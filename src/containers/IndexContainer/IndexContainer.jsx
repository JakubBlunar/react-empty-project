import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { Container, Image } from 'semantic-ui-react';
import Sortable from 'react-anything-sortable';
import SortableItem from '../../components/SortableItem';


class IndexContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			result: ''
		};
	}
	handleSort = (data) => {
		this.setState({
			result: data.join(' ')
		});
	}

	render() {
		return (
			<Container>
				<Helmet title="Home" />

				<Link to="/about">
					<button ref={(but) => { this.button = but; }}>Go to About</button>
				</Link>

				<p>{this.state.result}</p>
				<Sortable onSort={this.handleSort}>
					<SortableItem key={1} sortData="react"><Image draggable={false} src="http://ww4.sinaimg.cn/large/831e9385gw1equsc4s1hbj207y02xmx9.jpg" /></SortableItem>
					<SortableItem key={2} sortData="angular"><Image draggable={false} src="http://ww4.sinaimg.cn/large/831e9385gw1equsc3q8lej20fz04waa8.jpg" /></SortableItem>
					<SortableItem key={3} sortData="backbone"><Image draggable={false} src="http://ww4.sinaimg.cn/large/831e9385gw1equsc46m7zj20ff02zq3h.jpg" /></SortableItem>
				</Sortable>
			</Container >
		);
	}
}

const mapStateToProps = state => ({
	...state
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer);
