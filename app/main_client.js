import React from 'react';
import './router.jsx';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

console.log('Running on client only');

Meteor.startup(() => {
  
});
