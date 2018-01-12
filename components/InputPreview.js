import React, { Component } from 'react';
import setMessage from '../actions/message';

export default class InputPreview extends React.Component {

    render() {
        return (
            <div>
                <input type="text" 
                    value={this.props.value}
                    onChange={e => this.props.onChange(e)}
                />
            </div>
        );
    }
}