import React from 'react';
import Button from './button.jsx';
import styles from './button.scss';
import ModalAnimations from '../Modal/ModalAnimations.js';
import Alerts from '../Alerts/alert.jsx';

const DeleteQuoteButton = React.createClass({
	handleClick(){
		var confirmDelete = confirm('Do you want to delete this quote?');

		if (confirmDelete){
			var quoteId = this.props.quote._id;

			Meteor.call('deleteQuote', quoteId, function(error){
				if (error){
					Alerts.throw(error, 'error');
				} else {
					ModalAnimations.animateOut();
				}
			})
		}
	},
	render(){
		return(
			 <button className={styles.delete} onClick={this.handleClick}>Delete</button>
		)
	}
});

export default DeleteQuoteButton;
