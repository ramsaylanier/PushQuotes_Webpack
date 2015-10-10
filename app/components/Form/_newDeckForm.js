import { Alerts } from '../Alerts/alert.jsx';

let newDeckForm = {
	className: ['full'],
	fields: [
		{
			id: 1,
			type: 'text',
			name: 'deck-title-field',
			className:['full'],
			label:'Deck Title',
			// onKeyUp: function(e){
			// 	$('[name=deck-slug-field]').val($(e.currentTarget).val().toLowerCase().replace(/ +/g,'-').replace(/[^\w-]+/g,''));
			// }
		},
		{
			id: 2,
			type: 'text',
			name: 'deck-slug-field',
			className:['full'],
			label: 'Unique Access Code',
			// onKeyUp: function(e){
			// 	$(e.currentTarget).val($(e.currentTarget).val().toLowerCase().replace(/ +/g,'-').replace(/[^\w-]+/g,''));
			// }
		},
		{
			id: 3,
			type: 'text',
			name: 'deck-hashtags-field',
			className:['full'],
			label: 'Hashtags'
		},
		{
			id: 4, type: 'checkbox', label: 'Sync With Slides.com', name: 'use-slides-field'
		},
		{id: 5, type: 'submit', value: 'Create Deck'}
	],

	onSubmit: function(e){
		e.preventDefault();
		var deckAttributes = {
			title: $(e.currentTarget).find('[name=deck-title-field]').val(),
			slug: $(e.currentTarget).find('[name=deck-slug-field]').val(),
			hashtags: $(e.currentTarget).find('[name=deck-hashtags-field]').val(),
			withSlides: $(e.currentTarget).find('[name=use-slides-field]').get(0).checked,
			author: Meteor.userId()
		};

		Meteor.call('createDeck', deckAttributes, function(error,result){
			if (error){
				Alerts.throw(error, 'error');
			} else {
				$('.close-modal-btn').click();
				FlowRouter.go('/' + Meteor.user().username + '/' + deckAttributes.slug);
			}
		});
	}
};

export default newDeckForm;
