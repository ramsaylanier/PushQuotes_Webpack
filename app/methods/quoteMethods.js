import Decks from '../collections/decks.js';
import Quotes from '../collections/quotes.js';

function verifyQuoteAttributes(quoteAttributes, userId, deckId, quoteId){

	if (!deckId){
		throw new Meteor.Error(422, 'Your quote must belong to a deck.');
	}

	if (!quoteAttributes.text){
		throw new Meteor.Error(422, 'You must have quote text.')
	}

	const deck = Decks.findOne(deckId);

	if(deck.author != userId)
		throw new Meteor.Error(422, "You can't add quotes to a deck you don't own!");

	if(quoteId){
		let quote = Quotes.findOne(quoteId);
		if( quote.deckId != deckId )
			throw new Meteor.Error(422, "This quote doesn't belong to that deck!")
	}

	const maxQuoteLength = 300;

	if(quoteAttributes.text.length > maxQuoteLength)
		throw new Meteor.Error(422, "Your quote can only be a maximum of " + maxQuoteLength + " characters!")


	quoteAttributes.order = (quoteAttributes.order == undefined) ? 1 : quoteAttributes.order
	quoteAttributes.slide = (quoteAttributes.slide == undefined) ? null : quoteAttributes.slide

	return quoteAttributes;
}

Meteor.methods({

	addQuote: function(deckId, oldQuoteAttributes){
		var quoteAttributes = verifyQuoteAttributes(oldQuoteAttributes, this.userId, deckId)

		const text = quoteAttributes.text;
		const order = quoteAttributes.order;
		const slide = quoteAttributes.slide;
		const author = this.userId;

		const quoteId = Quotes.insert({deckId: deckId, author: author, text: text, order: order, slide: slide, pushed: false, tweets: 0});
		Decks.update({_id: deckId}, {$addToSet: {quotes: quoteId}});

		return quoteId;
	},

	editQuote: function(quoteId, deckId, oldQuoteAttributes){

		const quoteAttributes = verifyQuoteAttributes(oldQuoteAttributes, this.userId, deckId, quoteId)

		Quotes.update({_id: quoteId}, {$set: {text:quoteAttributes.text, order: quoteAttributes.order, slide:quoteAttributes.slide}});

		return quoteId
	},

	deleteQuote: function(quoteId){
		const quote = Quotes.findOne(quoteId);
		if (quote.author !== this.userId){
			throw new Meteor.Error(422, 'You are not the author of this deck.')
		}

		Quotes.remove({_id: quoteId});
		Decks.update({quotes: quoteId}, {$pull: {quotes: quoteId}});
	},

	duplicateQuote: function(quoteId, deckId){
		const quote = Quotes.findOne(quoteId);
		return Quotes.insert({deckId: deckId, text: quote.text, author: quote.author, order: quote.order, slide: quote.slide, tweets: 0});
	},

	pushQuote: function(quoteId){
		return Quotes.update(quoteId, {$set: {pushed: true}});
	},

	incTweets: function(quoteId){

		if(!Quotes.findOne(quoteId).tweets)
			Quotes.update({_id:quoteId},{$set:{tweets:1}})
		else
			Quotes.update({_id:quoteId},{$inc:{tweets:1}})
	}
})
