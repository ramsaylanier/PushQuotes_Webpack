import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import CSSModules from 'react-css-modules';

import styles from './header.css';

const Header = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		return{
			loggedIn: Meteor.user()
		}
	},
	render: function(){

		let className = styles.element;
		console.log(this.data);

		return (
			<header styleName='element'>
				<div className="wrapper">
					{this.props.children}
				</div>
			</header>
		)
	}
});

export default CSSModules(Header, styles);
