import React from 'react';
import App from './components/App.jsx';
import './router.js';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

console.log('Running on client only');

Meteor.startup(() => {
  React.render(<App/>, document.getElementById('root'));
});
