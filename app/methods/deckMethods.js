// import Decks from '../collections/decks.js';
// import Quotes from '../collections/quotes.js';

function verifyDeckAttributes(deckAttributes, userId, deckId){

	if (!deckAttributes.title){
		throw new Meteor.Error(422, 'Please give your deck a title.')
	}

	if(deckId){
		var deck = Decks.findOne(deckId);

		if(userId !== deck.author){
			throw new Meteor.Error(422, 'You are not the author of this deck.')
		}
	}

	var existingDeckWithTitle = Decks.findOne({author: userId, title: deckAttributes.title});
	var existingSlug = Decks.findOne({slug: deckAttributes.slug});

	if (existingDeckWithTitle && (!deckId || deckId != existingDeckWithTitle._id)){
		throw new Meteor.Error(422, 'You already have a Deck with this title.');
	}

	if (existingSlug && (!deckId || deckId != existingSlug._id)){
		throw new Meteor.Error(422, "Sorry, that access code has already been taken. Try a different one.");
	}

	var titleLengthLimit = 140
	if(deckAttributes.title.length > titleLengthLimit)
		throw new Meteor.Error(422, "Your title can't be longer than " + titleLengthLimit + " characters!")

	if (!deckAttributes.slug){
		throw new Meteor.Error(422, 'Please give your deck a slug.')
	}

	if(deckAttributes.slug.length > titleLengthLimit)
		throw new Meteor.Error(422, "Your slug can't be longer than " + titleLengthLimit + " characters!")


	if (typeof(deckAttributes.title) !== 'string'){
		throw new Meteor.Error(422, 'Nice Try, HAX0R. Your deck title must be a string.');
	}

	if (!deckAttributes.author || deckAttributes.author !== userId){
		throw new Meteor.Error(422, 'Nice Try, HAX0R. You must be logged in.');
	}


	if (deckAttributes.hashtags.length > 0){
		deckAttributes.hashtags = typeof deckAttributes.hashtags === 'string' ? deckAttributes.hashtags.split(/[\,\s\#]/g) : deckAttributes.hashtags;

		_.each(deckAttributes.hashtags, function(hashtag, index){
			deckAttributes.hashtags[index] = hashtag.trim();
		})

		deckAttributes.hashtags = _.filter(deckAttributes.hashtags, function(e){
			return e.length > 0
		})

		deckAttributes.hashtags = _.uniq(deckAttributes.hashtags)
	}

	var hashtagLimit = 5;
	var acceptableHashtagRegex = /^[a-zA-Z0-9]+$/g;
	var maxHashtagLength = 20;

	if(deckAttributes.hashtags.length > hashtagLimit){
		throw new Meteor.Error(422, "Sorry! You can only have " + hashtagLimit + " hashtags!")
	}

	var allHashtagsPass = _.every(deckAttributes.hashtags, function(el){
		return el.match(acceptableHashtagRegex)
	})

	var allHashtagsShortEnough = _.every(deckAttributes.hashtags, function(el){
		return el.length < maxHashtagLength
	})

	if(!allHashtagsPass){
		throw new Meteor.Error(422, "Make sure you're using valid hashtags! Only alphanumeric characters are allowed!")
	}

	if(!allHashtagsShortEnough){
		throw new Meteor.Error(422, "Make sure all of your hashtags are less than " + maxHashtagLength + " characters!")
	}

	return deckAttributes
}

function verifyAuthor(deckId, userId){
	var deck = Decks.findOne(deckId);
	if(userId !== deck.author){
		throw new Meteor.Error(422, 'You are not the author of this deck.')
	}

	return deck;
}

Meteor.methods({
	createDeck: function(originalDeckAttributes){

		var deckAttributes = verifyDeckAttributes(originalDeckAttributes, this.userId)

		deckAttributes.authorName = Meteor.users.findOne(this.userId).username;
		deckAttributes.quotes = [];
		deckAttributes.followers = [];
		deckAttributes.isPrivate = false;
		deckAttributes.createdOn = new Date();

		var deckId = Decks.insert(deckAttributes);

		return deckId;


	},
	editDeck: function(deckId, originalDeckAttributes){
		var deckAttributes = verifyDeckAttributes(originalDeckAttributes, this.userId, deckId)
		var updatedDeckId = Decks.update({_id: deckId}, {$set: {title: deckAttributes.title, image: deckAttributes.image, withSlides: deckAttributes.withSlides, hashtags: deckAttributes.hashtags, slug: deckAttributes.slug, description: deckAttributes.description, isPrivate: deckAttributes.isPrivate}});

		return updatedDeckId;

	},
	duplicateDeck: function(existingDeckId){

		var verifiedDeck = verifyAuthor(existingDeckId, this.userId);
		verifiedDeck.slug += '_copy';
		verifiedDeck.title += '_copy';
		verifiedDeck.createdOn = new Date();
		delete verifiedDeck['_id'];

		var deckAttributes = verifyDeckAttributes(verifiedDeck, this.userId);
		var newDeckId = Decks.insert(deckAttributes);
		var newQuotes = [];

		_.each(deckAttributes.quotes, function(quoteId){
			var newQuoteId = Meteor.call('duplicateQuote', quoteId, newDeckId);
			newQuotes.push(newQuoteId);
		})

		Decks.update(newDeckId, {$set: {quotes: newQuotes}});

		return newDeckId;
	},
	deleteForm: function(deckId){
		var deck = Decks.findOne(deckId);
		if (this.userId != deck.author){
			throw new Meteor.Error(422, 'You are not the author of this deck.');
		}

		Decks.remove(deckId);
	},
	goLive: function(deckId){
		var deck = Decks.findOne(deckId);

		if (deck.author !== this.userId){
			throw new Meteor.Error(422, 'You are not the author of this deck.')
		}

		return Decks.update({_id: deckId}, {$set: {live: true}});
	},
	endLive: function(deckId){
		var deck = Decks.findOne(deckId);

		if (deck.author !== this.userId){
			throw new Meteor.Error(422, 'You are not the author of this deck.')
		}

		Decks.update({_id: deckId}, {$set: {live: false}});
		Quotes.update({deckId: deckId}, {$set: {pushed: false}}, {multi: true});
	},
	updateQuotesFromExtension: function(slideURL, username, deckURL){
		var slide = slideURL.replace(/^\D+/g, '');
		var deck = Decks.findOne({authorName: username, slug: deckURL});

		if (!deck.live){
			Decks.update({_id: deck._id}, {$set: {live:true}});
		}

		Quotes.update({deckId: deck._id, slide: slide}, {$set: {active: true}});



		return "test"
	},
	loginFromExtension: function(username, password){
		  try {
		    if (ApiPassword.isPasswordValid(username, password)) {
		    	console.log('password is valid for this user');
		    	return true;
		    } else {
		    	return 'Password is not valid.'
		    }
		  } catch (exc) {
		      console.log(exc.message);
		      return exc.message;
		      // 'User is not found', 'User has no password set', etc
		  }
	},
	viewPresentation: function(presentationKey){
		var deck = Decks.findOne({slug: presentationKey});

		if (!deck)
			throw new Meteor.Error(422, 'There is no deck with that key.');


		if (!deck.live)
			throw new Meteor.Error(422, 'That presentation is not currently live.');

		var url = deck.authorName + '/' + presentationKey + '/live';

		return url
	}
});

// Decks.before.remove(function(userId, doc){
//
// 	var deckId = doc._id;
//
// 	if (userId != doc.author){
// 		throw new Meteor.Error(422, 'You are not the author of this deck.');
// 	}
//
// 	Quotes.remove({deckId: deckId});
// });
