import React from 'react';
import ReactDOM from 'react-dom';
import reactMixin from 'react-mixin';

//PAGES
import { LoginPage, RegisterPage, DashboardPage, NotFoundPage, DeckPage, DeckPresentationPage } from './components/Page/Pages.js';

import MainLayout from './components/Layouts/MainLayout.jsx';
import ModalToggle from './components/Toggles/_modalToggle.jsx';
import AddDeckModal from './components/Modal/addDeckModal.jsx';

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
		ReactDOM.render(
			<MainLayout content={<LoginPage/>}/>,
			document.getElementById('react-root')
		)
	}
});

FlowRouter.route('/register', {
	action: function(){
		ReactDOM.render(
			<MainLayout content={<RegisterPage/>}/>,
			document.getElementById('react-root')
		)
	}
})

FlowRouter.route('/:username', {
	name: 'dashboardPage',
	action: function(params){
		ReactDOM.render(
			<MainLayout
				content={<DashboardPage/>}/>,
			document.getElementById('react-root')
		)
	}
})

FlowRouter.route('/:username/:slug', {
	name: 'deckPage',
	action: function(params){
		ReactDOM.render(
			<MainLayout content={<DeckPage/>}/>,
			document.getElementById('react-root')
		)
	}
});

FlowRouter.route('/:username/:slug/live', {
	name: 'deckPage',
	action: function(params){
		ReactDOM.render(
			<MainLayout content={<DeckPresentationPage/>}/>,
			document.getElementById('react-root')
		)
	}
});

FlowRouter.initialize();
