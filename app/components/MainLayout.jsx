import React, {Component} from 'react';
import reactMixin from 'react-mixin';

import Header from './Header/header.jsx';

const MainLayout = React.createClass({
	render(){

		var withUser = Meteor.userId();

		return (
			<div className={"application" + (withUser ? ' with-user' : '')}>

				<Header className="app-header">
					<div className="title-container">
						<p className="title"></p>
					</div>
				</Header>

				<main>
					{this.props.content}
				</main>
				
			</div>
		)
	}
});

export default MainLayout;
