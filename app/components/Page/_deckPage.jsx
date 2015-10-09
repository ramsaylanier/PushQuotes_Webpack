import React from 'react';

//components
import {Page, PageHero, PageContent } from './page.jsx';
import Toggle from '../Toggles/toggle.jsx';
import LiveToggle from '../Toggles/_liveToggle.jsx';
import ModalToggle from '../Toggles/_modalToggle.jsx';
import QuoteList from '../Quotes/quoteList.jsx';
import AddQuoteModal from '../Modal/_addQuoteModal.jsx';
import EditDeckModal from '../Modal/_editDeckModal.jsx';

//collections
// import Decks from '../../collections/decks.js';
// import Quotes from '../../collections/quotes.js';

//styles
import styles from './page.scss';
import wrapperStyles from '../../Stylesheets/wrapper.scss';
import deckStyles from '../Decks/deck.scss';

const DeckPage = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		let slug = FlowRouter.getParam('slug');
		let authorName = FlowRouter.getParam('username');
		let deckSub = Meteor.subscribe('deckList', {slug: slug}, authorName);
		let quoteSub, deck, deckId;

		if (deckSub.ready()){
			deck = Decks.findOne({slug: slug});
			deckId = deck ? deck._id : null;

			let query = deck.live ? {deckId: deckId, pushed: false} : {deckId: deckId};

			quoteSub = Meteor.subscribe('quoteList', query);
		}

		return {
			ready: deckSub.ready() && quoteSub.ready(),
			deck: deck,
			quotes: Quotes.find({}, {sort: {order: -1}}).fetch()
		}
	},

	render(){
		if (this.data.ready){
			this.setTitle();

			let deck = this.data.deck;
			let quotes = this.data.quotes;
			let isLive = deck.live;
			let isAuthor = deck.author === Meteor.userId();
      let className = isLive ? styles.live : styles.base;

			if (!deck){
				return <NotFoundPage/>
			}

			if (isLive && !isAuthor){
				FlowRouter.go(window.location.pathname + '/live')
			}

			return (
				<div className={wrapperStyles.page}>
					<Page className={className}>
						<PageHero heroImage={deck.image}>
							<h2 className={styles.title}>{deck.title}</h2>
							{this._deckDescription()}
							{this._deckHashtags()}

							{!isLive && isAuthor && <ModalToggle type="edit" modal={<EditDeckModal deck={this.data.deck} />} /> }
						</PageHero>
						<PageContent>
							<QuoteList deck={deck} isLive={isLive} quotes={quotes} />
						</PageContent>
					</Page>

  				{isAuthor && <LiveToggle deckId={deck._id} live={deck.live}/>}
  				{!isLive && isAuthor && <ModalToggle modal={<AddQuoteModal/>} /> }
				</div>
			)
		} else {
			return (
				<p></p>
			)
		}
	},

	_deckDescription(){
		if (this.data.deck.description){
			return (
				<p className={deckStyles.description}>{this.data.deck.description}</p>
			)
		}
	},

	_deckHashtags(){
    if (this.data.deck.hashtags){

			let className = deckStyles.hashtags;
			let hashtagClassName = deckStyles.hashtag;

			return (
				<div className={className}>
					{this.data.deck.hashtags.map((hashtag) => {
						return(
							<a key={hashtag} className={hashtagClassName} href={"/hashtag/" + hashtag}>#{hashtag}</a>
						)
					})}
				</div>
			)
		}
	},

	setTitle(){
		$('.app-header .title').text(this.data.deck.title);
	}
});

export default DeckPage;
