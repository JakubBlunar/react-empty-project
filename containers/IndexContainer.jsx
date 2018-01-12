import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import InputPreview from '../components/InputPreview';
import * as messageActions from '../actions/message';
import style from './IndexContainer.scss';
import imgGif from '../public/images/image.gif';

class IndexContainer extends Component {
    render() {
        const { message } = this.props.messageStore;
        return (
            <div>
                <h1 className={style.header}>Index page</h1>
               
                <img src={imgGif} />
                <br />
                <br />
                <br />
                <InputPreview 
                    message={message} 
                    onChange={e => this.props.actions.setMessage(e.target.value)}
                />
                <br />
                <br />
                <Link to='/about'>
                    <button>Go to About</button>
                </Link>
            </div>
        );
    }
};

const mapStateToProps = function(state){
    return {
        messageStore: state.messageStore
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(messageActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer);