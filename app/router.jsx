import React, {Component} from 'react';
import reactMixin from 'react-mixin';

import MainLayout from './components/MainLayout.jsx';
import Login from './components/Login/login.jsx';

FlowRouter.route('/', {
	triggersEnter: [function(context, redirect){
		if (!Meteor.user()){
			redirect('/login');
		} else (
			redirect('/' + Meteor.user().username)
		)
	}]
});

FlowRouter.route('/login', {
	triggersEnter: [function(context, redirect){
		if (Meteor.userId()){
			redirect('/');
		}
	}],
	action: function(){
		ReactLayout.render(MainLayout, {
			content: <Login/>
		})
	}
});

FlowRouter.initialize();
