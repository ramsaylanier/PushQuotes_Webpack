import React from 'react';
import { TwitterIcon } from '../Icons/icons.jsx';
import styles from './button.scss';

const TweetButton = React.createClass({

  setTweetURL(){
    let baseURL = "https://twitter.com/intent/tweet?text=";
    let tweet = encodeURIComponent('"' + this.props.tweet + '"');
    let hashtags = "&hashtags=" + this.props.hashtags.join(', ') || '';

    return baseURL + tweet + hashtags;
  },

  render(){
    return(
      <a className={styles.twitter} href={this.setTweetURL()}>{TwitterIcon} Share</a>
    )
  }
});

export default TweetButton;
