import React from 'react';
import QuoteItem from './quoteItem.jsx';
import styles from './quotes.scss';


const QuoteList = React.createClass({

	propTypes: {
		quotes: React.PropTypes.array.isRequired,
		deck: React.PropTypes.object.isRequired
	},

	componentWillMount(){
		Session.set('quoteCount', 1);
	},

	componentDidUpdate(prevProps, prevState){
		if ($('.live-page').length && $('.quote-item').length){
			let offset = $('.quote-item').last().offset().top - 150;
			$('body').velocity('stop');
			$('body').velocity('scroll', {offset: offset || 0, mobileHA: false });
		}
	},

	render(){
		let quotes = this.props.quotes;
		let deck = this.props.deck;
		let withSlides = this.props.deck.withSlides;
		let isAuthor = Meteor.userId() === deck.author;
		let className = this.props.isLive? styles.list__live : styles.list;

		return (
			<ul className={className}>
				{!quotes.length && <p>Add a quote!</p>}
				{quotes.map((quote) => {
					return (
						<QuoteItem key={quote._id} isAuthor={isAuthor} withSlides={withSlides} quote={quote} deck={deck}/>
					)
				})}
			</ul>
		)
	}
});

export default QuoteList;
