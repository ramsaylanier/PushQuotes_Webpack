import React, {Component} from 'react';
import reactMixin from 'react-mixin';

import Header from "./Header/header.jsx";


let MainLayout = React.createClass({
	render(){

		var withUser = Meteor.userId();

		return (
			<div className={"application" + (withUser ? ' with-user' : '')}>

				<Header className="app-header">
					<div className="title-container">
						<p className="title"></p>
					</div>
				</Header>

				<AlertsComponent/>

				<main>
					{this.props.content}
				</main>
			</div>
		)
	}
});

export const MainLayout;
