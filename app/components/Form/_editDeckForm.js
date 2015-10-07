import ModalAnimations from '../Modal/ModalAnimations.js';

let editDeckForm = {
	className: ['full'],
	fields: [
		{
			id: 1,
			type: 'text',
			name: 'deck-title-field',
			className:['full'],
			label: 'Deck Title',
			onKeyUp: function(e){
				$('.deck-slug-field').val($(e.currentTarget).val().toLowerCase().replace(/ +/g,'-').replace(/[^\w-]+/g,''));
			}
		},
		{
			id: 2,
			type: 'text',
			name: 'deck-slug-field',
			className:['full'],
			label: 'Unique Access Form',
			onKeyUp: function(e){
				$(e.currentTarget).val($(e.currentTarget).val().toLowerCase().replace(/ +/g,'-').replace(/[^\w-]+/g,''));
			}
		},
		{
			id: 3,
			type: 'text',
			name: 'deck-description-field',
			className:['full'],
			label: 'Description'
		},
		{
			id: 4,
			type: 'text',
			name: 'deck-hashtags-field',
			className:['full'],
			label: 'Hashtags'
		},
		{
			id: 5,
			type: 'url',
			name: 'deck-image-field',
			className:['full'],
			label: 'URL of Image'
		},
		{id: 6, type: 'checkbox', label: 'Sync With Slides.com', name: 'use-slides-field'},
		{id: 7, type: 'submit', value: 'Save', className: ['full']}
	],
	onSubmit: function(e){
		e.preventDefault();

		var deckID = editDeckForm.deckId;

		var deckAttributes = {
			title: $(e.currentTarget).find('[name=deck-title-field]').val(),
			slug: $(e.currentTarget).find('[name=deck-slug-field]').val(),
			description: $(e.currentTarget).find('[name=deck-description-field]').val(),
			withSlides: $(e.currentTarget).find('[name=use-slides-field]').get(0).checked,
			hashtags: $(e.currentTarget).find('[name=deck-hashtags-field]').val(),
			image: $(e.currentTarget).find('[name=deck-image-field]').val(),
			author: Meteor.userId()
		}

		_.each(deckAttributes.hashtags, function(hashtag, index){
			deckAttributes.hashtags[index] = hashtag.trim();
		})

		Meteor.call('editDeck', deckID, deckAttributes, function(error){
			if (error){
				Alerts.throw(error, 'error');
			} else {
				ModalAnimations.animateOut();

				//Check to see if there is an existing slug. If so, that means we are on the deck view page.
				var currentSlug = FlowRouter.getParam('slug');

				//If on the deck view page, reroute to new slug if the slug has changed to prevent router/rendering errors.
				if (currentSlug){
					FlowRouter.go('/' + FlowRouter.getParam('username') + '/' + deckAttributes.slug);
				}
			}
		})
	}
};

export default editDeckForm;
