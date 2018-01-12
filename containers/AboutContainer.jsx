import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

class AboutContainer extends Component {
    render() {
        return (
            <div>
                <h1>About page</h1>
                <Link to='/'>
                    <button>Go to index</button>
                </Link>
            </div>
        );
    }
};

const mapStateToProps = function(state){
    return {
        ...state
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {}
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutContainer);