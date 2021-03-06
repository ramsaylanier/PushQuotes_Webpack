import React from 'react';
import ReactDOM from 'react-dom';
import './router.jsx';
import './methods/deckMethods.js';
import './methods/quoteMethods.js';
import './methods/userMethods.js';

Meteor.startup(() => {
  // React.initializeTouchEvents(true);
	// window.viewportUnitsBuggyfill.init({force:true});

	var loginStyle = "popup";

	Meteor.call('serviceConfig', loginStyle, function(error){
		if (error)
			Errors.throw(error.reason, 'error')
	});

	Meteor.subscribe('userProfile');

	// twttr.events.bind(
	//   'tweet',
	//   function (event) {
	//     var quoteId = event.target.id
	//     Meteor.call('incTweets', quoteId, function(){
	//     	console.log("Incremented tweet")
	//     })
	//   }
	// );

	Accounts.onLogin(function(){
		var user = Meteor.user();

		if (!user.profile.avatar){
			Meteor.users.update(user._id, {$set: {'profile.avatar': '/img/default-avatar.png'}});
		}
	})
});
