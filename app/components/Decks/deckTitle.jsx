import React from 'react';
import styles from './deck.scss';

const DeckTitle = React.createClass({
	render(){

		var link = this.props.link;

		return (
			<h2 className={styles.title}>
				{link ?
					<a href={link} className={this.props.classes}>{this.props.children}</a>
					:
					this.props.children
				}
			</h2>
		)
	}
});

export default DeckTitle;
