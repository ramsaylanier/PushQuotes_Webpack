import React from 'react';

//components
import {Page, PageContent } from './page.jsx';
import QuoteList from '../Quotes/quoteList.jsx';
import QuoteCount from '../Quotes/quoteCount.jsx';
import AddQuoteModal from '../Modal/_addQuoteModal.jsx';
import EditDeckModal from '../Modal/_editDeckModal.jsx';

//collections
import Decks from '../../collections/decks.js';
import Quotes from '../../collections/quotes.js';

//styles
import styles from './page.scss';
import wrapperStyles from '../../Stylesheets/wrapper.scss';
import deckStyles from '../Decks/deck.scss';

const DeckPresentationPage = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		let slug = FlowRouter.getParam('slug');
		let authorName = FlowRouter.getParam('username');
		let deckSub = Meteor.subscribe('deckList', {slug: slug}, authorName);
		let quoteSub, deck, deckId;

		if (deckSub.ready()){
			deck = Decks.findOne({slug: slug});
			deckId = deck ? deck._id : null;
			quoteSub = Meteor.subscribe('quoteList', {deckId: deckId, pushed: true});
		}

		return {
			ready: deckSub.ready() && quoteSub.ready(),
			deck: deck,
			quotes: Quotes.find({}, {sort: {order: 1}}).fetch()
		}
	},

	componentDidMount(){

		let window = $(window);

		window.on('scroll', (e) => {
			let pos = window.scrollTop();
			let target = $('.page-content').offset().top;
			let title = $('.app-header .title');
			let active = title.hasClass('active');

			if (pos > target && !active){
				title.addClass('active');
			} else if (pos < target && active){
				title.removeClass('active');
			}
		});
	},

	render(){
		if (this.data.ready){

			let deck = this.data.deck;
			let quotes = this.data.quotes;

			if (!deck){
				return <NotFoundPage/>
			}

			this.setTitle();

			return (
				<div className="page-wrapper">
				<Page className="live-page">
					<PageContent>
						<QuoteCount total={deck.quotes.length} quotes={quotes.length}/>
						<QuoteList deck={deck} quotes={quotes} />
					</PageContent>
				</Page>
				</div>
			)
		} else {
			return (
				<p></p>
			)
		}
	},

	setTitle(){
		$('.app-header .title').text(this.data.deck.title);
	}
});

export default DeckPresentationPage;
