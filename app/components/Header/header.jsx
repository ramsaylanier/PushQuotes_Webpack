import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import styles from './header.css';

const Header = React.createClass({
	mixin: [ReactMeteorData],

	getMeteorData(){
		return{
			loggedIn: Meteor.user()
		}
	},

	render(){

		console.log(styles);

		let className = styles.element;

		return (
			<header className={className}>
				<div className="wrapper">
					{this.props.children}
				</div>
			</header>
		)
	}
});

export default Header;
