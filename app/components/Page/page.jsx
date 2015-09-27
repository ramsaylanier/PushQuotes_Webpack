import React, {Component} from 'react';
import reactMixin from 'react-mixin';


// Write your package code here!
Page = React.createClass({
	componentDidMount: function(){
		if (Settings.AnimatePages){
			var item = $(this.getDOMNode());
			var animation = this.props.animation || PageAnimations.animateIn;
			AnimateItem(item, PageAnimations.animateIn);
		}
	},
	render: function(){
		var styles = {
			backgroundImage: "url('" + this.props.backgroundImage + "')",
		}

		var children = this.props.children;
		return(
			<div className={"page " + this.props.className} style={styles}>
				{children}
			</div>
		)
	}
});

let PageHeader = React.createClass({
	render: function(){

		var styles = this.props.backgroundImage && {
			backgroundImage: "url('" + this.props.backgroundImage + "')",
		};

		return (
			<div className="page-header" style={styles}>
				{this.props.children}
			</div>
		)
	}
});

let PageTitle = React.createClass({
	componentDidMount: function(){
		var item = this.getDOMNode();
		$(item).velocity({
			opacity: 1,
			scale: [1, 1.1]
		}, 1000, [.5, .1, .1, 1])
	},
	render: function(){
		return (
			<h1 className="page-title">
				{this.props.children}
			</h1>
		)
	}
});

PageContent = React.createClass({
	render(){
		return(
			<div className={"page-content " + this.props.classes}>
				<div className="wrapper">
					{this.props.children}
				</div>
			</div>
		)
	}
})

PageSection = React.createClass({
	render:function(){
		return(
			<section className={"page-section " + this.props.className}>
				<div className="wrapper">
					{this.props.children}
				</div>
				{this.props.separator && <PageSeparator/>}
			</section>
		)
	}
});

PageSeparator = React.createClass({
	render: function(){
		return(
			<div className="page-separator">
			</div>
		)
	}
});

PageAnimations = {
	defaults: {
		duration: .5,
		properties: {
			opacity: 1,
			ease: Power2.easeOut
		}
	}
}

PageAnimations.animateIn = {
	duration: PageAnimations.defaults.duration,
	properties: PageAnimations.defaults.properties
}

PageAnimations.animateOut = {
	duration: PageAnimations.defaults.duration,
	properties: {
		opacity: 0,
		ease: Power2.easeOut
	}
}
