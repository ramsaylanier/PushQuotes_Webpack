import React from 'react';
import QuoteAnimations from './quoteAnimations.js';

//components
import ModalToggle from '../Toggles/_modalToggle.jsx';
import TweetButton from '../Button/tweetButton.jsx';
import EditQuoteModal from '../Modal/_editQuoteModal.jsx';
import { editQuoteForm } from '../Form/Forms.js';

//triggers

//styles
import styles from './quotes.scss';

const QuoteItem = React.createClass({

	propTypes: {
		isAuthor: React.PropTypes.bool.isRequired,
		withSlides: React.PropTypes.bool.isRequired,
		deck: React.PropTypes.object.isRequired
	},

	getInitialState(){
		return{
			mc: null,
			snapped: false,
			isAuthor: false
		}
	},

	componentDidMount(){
		let item = this.getDOMNode(this.refs.quoteListItem);
		let itemCount = Session.get('quoteCount');
		let isAuthor = Meteor.userId() === this.props.deck.author;

		this.setState({isAuthor: Meteor.userId() === this.props.deck.author});

		QuoteAnimations.animateIn(item, itemCount);

		Session.set('quoteCount', itemCount + 1);
		this.setState({mc: new Hammer(item)});
	},

	componentDidUpdate(oldProps){
		if (this.state.isAuthor){
			let item = this.getDOMNode(this.refs.quoteListItem);
			this.setPan(item);
		}

		if (oldProps.deck.live && !this.props.deck.live){
			QuoteAnimations.reset();
		}
	},

	componentWillUnmount(){
		let item = this.getDOMNode(this.refs.quoteListItem);
		QuoteAnimations.animateOut(item);
	},

	render(){
		let deck = this.props.deck;
		let quote = this.props.quote;
		let isLive = deck.live;
		let draggable = this.props.isAuthor && isLive;

		return (
			<li ref="quoteListItem" className={styles.base}>
				<div className={styles.header}>
					{this._quoteOrder()}
					{this._quoteSlide()}
				</div>
				<div className={styles.body}>
					<p className={styles.text}>{'"' + quote.text + 	'"'}</p>
					{this._quoteActions()}
				</div>
				<div className={styles.footer}>
					{this._actionToggle()}
				</div>
			</li>
		)
	},

	_quoteOrder(){
		if (this.props.isAuthor && this.props.quote.order){
			return <p className={styles.meta}>Order: {this.props.quote.order}</p>
		}
	},

	_quoteSlide(){
		if (this.props.isAuthor && this.props.quote.slide){
			return(
				<p className={styles.meta}>Slide: {this.props.quote.slide}</p>
			)
		}
	},

	_quoteActions(){
		if (!this.props.isAuthor && this.props.deck.live){
			return(
				<TweetButton tweet={this.props.quote.text} hashtags={this.props.deck.hashtags}/>
			)
		}
	},

	_actionToggle(){
		if (this.props.isAuthor && !this.props.isLive){
			return (
				<ModalToggle type="edit" modal={<EditQuoteModal quote={ this.props.quote } /> } />
			)
		}
	},

	setPan(item){
		let mc = this.state.mc;
		let snapped = this.state.snapped;

		if (this.props.deck.live && mc){
			mc.set({enable: true});
			mc.on("panleft", (ev) => {
				if (-ev.deltaX > window.innerWidth / 3 && !this.state.snapped){
					this.Snap(item);
				}

				if (!this.state.snapped){
					TweenMax.to(item, 1, {
						x: ev.deltaX,
						rotation: ev.deltaX / 180,
						scale: 1 - ev.deltaX/window.innerWidth/2,
						boxShadow: "0px " + (-ev.deltaX/10 + 5) + "px " + (-ev.deltaX/10 + 5) + "px -5px rgba(0,0,0,.3)"
					});
				}
			});

			mc.on("panend", (ev) => {
				if (!this.state.snapped){
					TweenMax.to(item, .3, {
						x: 0,
						rotation: 0,
						scale: 1,
						boxShadow: "0px 5px 5px -5px rgba(0,0,0,.3)"
					});
				}
			});
		} else if (mc) {
			mc.set({enable: false});
		}
	},

	Snap(item){
		let quoteId = this.props.quote._id;
		this.state.snapped = true;

		TweenMax.to(item, .3, {
			x: -window.innerWidth,
			rotation: -10,
			scale: 1
		});

		Meteor.setTimeout( ()=> {
			Meteor.call('pushQuote', quoteId, function(err, res){
				if (err){
					Alerts.throw(err, 'error');
				}
			})

			this.state.snapped = false;
		}, 300);
	}
});

export default QuoteItem;
