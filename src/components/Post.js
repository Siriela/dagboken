import React from 'react';
import SetTime from './SetTime';
export default class Post extends React.Component {

    render() {
        return (
        <div className="diary-postlist-container">
        <div className="diary-postlist-post" key={this.props.key}>{this.props.children}</div>
        <span className="diary-set-time"><SetTime id={this.props.key}/></span>
        </div>)
    }
}
