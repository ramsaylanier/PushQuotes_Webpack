import Decks from '../collections/decks.js';

Meteor.publish('deckList', function(query){
	// var user = Meteor.users.findOne({username: deckAuthorName})._id;
	if (!this.userId){
		console.log('not logged in');
		return Decks.find(query, {fields: {authorName: 1, hashtags: 1, description: 1, image: 1, quotes: 1, title: 1, slug: 1}});
	} else {
		return Decks.find(query);
	}
});
