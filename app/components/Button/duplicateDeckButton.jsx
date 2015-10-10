import React from 'react';
import { CopyIcon } from '../Icons/icons.jsx';
import ModalAnimations from '../Modal/ModalAnimations.js';
import styles from './button.scss';

const DuplicateDeckButton = React.createClass({

  	handleClick(){
  		var deckId = this.props.deck._id;

  		Meteor.call('duplicateDeck', deckId, function(error){
  			if (error){
  				alert(error)
  			} else {
  				ModalAnimations.animateOut();
  			}
  		});
  	},

  	render(){

      let className = styles.duplicate;

  		return(
  			 <button className={className} onClick={this.handleClick}>{CopyIcon}</button>
  		)
  	}
  })

export default DuplicateDeckButton;
