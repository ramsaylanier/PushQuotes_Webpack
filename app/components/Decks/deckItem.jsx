import React from 'react';
import DeckTitle from './deckTitle.jsx';
import ModalToggle from '../Toggles/_modalToggle.jsx';
import EditDeckModal from '../Modal/_editDeckModal.jsx';


import styles from './deck.scss';

const DeckItem = React.createClass({

	componentDidMount(){
		let self = this;
		let itemCount = Session.get('itemCount');
		let item = this.getDOMNode();
		Meteor.setTimeout(function(){

			TweenMax.fromTo(item, 1, {
				opacity: 0,
				y: 20
			}, {
				opacity: 1,
				y: 0,
				ease: Power2.easeOut,
				delay: (itemCount * .05)
			});
		}, 0);

		Session.set('itemCount', itemCount + 1);
	},

	handleClick(e){
		console.log(e);
		let link = "/" + this.props.authorName + '/' + this.props.slug;
		Router.go(link);
	},

	render(){
		let isAuthor = Meteor.userId() == this.props.author;
		let hashtags = this.props.hashtags;

		let className = styles.base;

		return (
			<li className={className}>
				{this._deckImage()}

				<div className={styles.details}>

					{this._liveNotification()}

					<DeckTitle link={"/" + this.props.authorName + '/' + this.props.slug} classes="transition-link">
						{this.props.title}
					</DeckTitle>

					{this._deckDescription()}
					{this._hashtags()}

				</div>

				{this._editAction(isAuthor)}

			</li>
		)
	},

	_deckImage(){
		if (this.props.image){

			let backgroundImage = {
				backgroundImage: "url('" + this.props.image + "')"
			};

			return(
				<div className={styles.image} style={backgroundImage}></div>
			)
		}
	},

	_liveNotification(){
		if (this.props.live){
			return <span className={styles.notification}>Live</span>
		}
	},

	_deckDescription(){
		if (this.props.description){
			return(
				<p className={styles.description}>{this.props.description}</p>
			)
		}
	},

	_hashtags(){
		if (this.props.hashtags){

			let className = styles.hashtags;
			let hashtagClassName = styles.hashtag;

			return (
				<div className={className}>
					{this.props.hashtags.map((hashtag) => {
						return(
							<a key={hashtag} className={hashtagClassName} href={"/hashtag/" + hashtag}>#{hashtag}</a>
						)
					})}
				</div>
			)
		}
	},

	_editAction(isAuthor){
		if (isAuthor){
			return(
				<ModalToggle type="edit" modal={<EditDeckModal deck={this.props}/>} />
			)
		}
	}
});

export default DeckItem;
