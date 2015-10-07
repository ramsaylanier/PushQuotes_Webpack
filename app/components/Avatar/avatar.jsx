import React from 'react';
import styles from './avatar.scss';

const Avatar = React.createClass({
	render: function(){

		let className = styles.base;
		return (
			<img className={className} src={this.props.image} />
		)
	}
});

export default Avatar;
