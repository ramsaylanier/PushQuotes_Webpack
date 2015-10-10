Modal = React.createClass({
	componentDidMount: function(){
		Animations.AnimateModalIn();
	},
	closeModal: function(){
		Animations.AnimateModalOut();
	},
	render: function(){
		return (
			<div className="modal-content">
				<Toggle className="close-modal-btn btn" onClick={this.closeModal}/>
				{this.props.children}
			</div>
		)
	}
})

Animations.AnimateModalOut = function(){
	var self = this;
	var modal = $('.modal');
	var page = $('.page');

	var dX = modal.outerWidth();

	TweenMax.to(page, .4, {
		x: "0%",
		ease: Power2.easeOut
	});

	TweenMax.to(modal, .4, {
		right: -window.innerWidth,
		ease: Power2.easeOut
	});

	Meteor.setTimeout(function(){
		React.unmountComponentAtNode(modal.get(0));
		modal.remove();
		$('body').removeClass('modal-active');
	}, 500);
}

Animations.AnimateModalIn = function(){
	var modal = $('.modal');
	var page = $('.page');
	var dX = modal.outerWidth() - ( (window.innerWidth - $('.wrapper').outerWidth()) / 2)

	TweenMax.to(page, .4, {
		x: -dX,
		ease: Power2.easeOut
	});

	TweenMax.to(modal, .4, {
		right: 0,
		ease: Power2.easeOut
	});

	$('body').addClass('modal-active');
}