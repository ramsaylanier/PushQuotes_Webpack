import React from 'react';
import DeckItem from './deckItem.jsx';

const DeckList = React.createClass({

	componentWillMount(){
		Session.set('itemCount', 1);
	},

	render(){
		return (
			<div className="deck-content">
				<ul className={this.props.className || "" + 'card-list'}>
					{this.props.decks.map((deck) => {
						return (
							<DeckItem key={deck._id} showAuthor={this.props.showAuthor} {...deck} favorites={this.props.favorites}/>
						)
					})}

					{this.props.decks.length == 0 &&
						<p>{this.props.message || "Nothing here!"}</p>
					}
				</ul>
			</div>
		)
	}
});

export default DeckList;
