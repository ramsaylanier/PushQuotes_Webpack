import Quotes from '../collections/quotes.js';


Meteor.publish('quoteList', function(query){

	// var deckId = Decks.findOne(query)._id;
	return Quotes.find(query, {sort: {order: 1}});
})
