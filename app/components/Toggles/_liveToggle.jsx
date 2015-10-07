import React from 'react';
import { StopIcon, PlayIcon } from '../Icons/icons.jsx';
import Toggle from './toggle.jsx';
import styles from './toggle.scss';

const LiveToggle = React.createClass({

	handleClick(){
		var deckId = this.props.deckId;

		if (!this.props.live){
			this._startPresentation();
		} else {
			this._endPresentation();
		}
	},

	render(){
		let live = this.props.live;
		let className = live ? styles.live : styles.dead;
		let type = live ? 'stop' : 'play';

		return (
			<Toggle type={type} action={this.handleClick}/>
		)
	},

	_startPresentation(){
		TweenMax.to($('window'), .25, {scrollTo: {y: 0}});

		Meteor.setTimeout( () => {
			Meteor.call('goLive', this.props.deckId, function(err, res){
				if (err){
					alert(err)
				} else {

				}
			})
		}, 250);
	},

	_endPresentation(){
		Meteor.call('endLive', this.props.deckId, function(err, res){
			if (err){
				alert(err)
			} else {

			}
		});
	}
});

export default LiveToggle;
