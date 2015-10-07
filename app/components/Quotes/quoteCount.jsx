import React from 'react';

const QuoteCount = React.createClass({
  render(){

    var quotes = $('.quote-item').length;

    return(
      <div className="quote-count">
        {this.props.quotes} / {this.props.total}
      </div>
    )
  }
});

export default QuoteCount;
