const QuoteAnimations = {};

QuoteAnimations.animateIn = function(quote, count){
  TweenMax.to(quote, 1, {
		opacity: 1,
		y: 0,
		ease: Power4.easeOut
	});
}

QuoteAnimations.animateOut = function(quote){
  	TweenMax.fromTo(quote, 1, {
  		opacity: 1,
  		y: 0
  	}, {
  		opacity: 1,
  		y: 20,
  		ease: Power4.easeOut
  	});
}

QuoteAnimations.reset = function(){
	var cards = $('.item');
	_.each(cards, function(card){
		TweenMax.to(card, .5, {
			opacity: 1,
			x: 0,
			scale: 1,
			rotation: 0,
			boxShadow: "0px 5px 5px -5px rgba(0,0,0,.3)"
		})
	})
}

export default QuoteAnimations;
