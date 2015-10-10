import Decks from '../../collections/decks.js';
import { Alerts } from '../Alerts/alert.jsx';
import ModalAnimations from '../Modal/ModalAnimations.js';

let newQuoteForm = {
	className: ['full'],
	fields: [
		{id: 1, type: 'textarea', name: 'quote-text-field', className:['full'], placeholder: 'Enter Quote Here', rows: 8},
		{id: 2, type: 'text', visibility: 'hidden', name: 'quote-slide-field', className:['full'], label: 'Slides.com Slide'},
		{id: 3, type: 'text', name: 'quote-order-field', className:['full'], label: 'Order'},
		{id: 4, type: 'submit', value: 'Add Quote'}
	],
	onSubmit: function(e){
		e.preventDefault();

		let deckId = Decks.findOne({slug: FlowRouter.getParam('slug')})._id;

		let quoteAttributes = {
			text: $(e.currentTarget).find('[name=quote-text-field]').val(),
			slide: $(e.currentTarget).find('[name=quote-slide-field]').val(),
			order: $(e.currentTarget).find('[name=quote-order-field]').val()
		}

		Meteor.call('addQuote', deckId, quoteAttributes, function(error){
			if (error){
				Alerts.throw(error, 'error');
			} else {
				ModalAnimations.animateOut();
			}
		})
	}
};

export default newQuoteForm;
