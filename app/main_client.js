import React from 'react';
import App from './components/App.jsx';
import './router.js';
import MainLayout from './components/MainLayout.jsx';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

console.log('Running on client only');

Meteor.startup(() => {
  console.log(MainLayout);
  React.render(<App/>, document.getElementById('root'));
});
