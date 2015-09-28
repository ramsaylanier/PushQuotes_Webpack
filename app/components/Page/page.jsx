import React, {Component} from 'react';
import reactMixin from 'react-mixin';

import Settings from '../../settings.js';
import PageAnimations from './animations.js';

import styles from './page.scss';

// Write your package code here!
const Page = React.createClass({
	componentDidMount(){
		if (Settings.AnimatePages){
			// var item = $(this.getDOMNode());
			// var animation = this.props.animation || PageAnimations.animateIn;
			// AnimateItem(item, PageAnimations.animateIn);
		}
	},
	render(){
		let bgImage = {
			backgroundImage: "url('" + this.props.backgroundImage + "')",
		}

		let className = styles.element;


		let children = this.props.children;
		return(
			<div className={className + ' page__live'}>
				{children}
			</div>
		)
	}
});

const PageHeader = React.createClass({
	render: function(){

		var bg = this.props.backgroundImage && {
			backgroundImage: "url('" + this.props.backgroundImage + "')",
		};

		return (
			<div className="page-header" style={bg}>
				{this.props.children}
			</div>
		)
	}
});

const PageTitle = React.createClass({
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

const PageContent = React.createClass({
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

const PageSection = React.createClass({
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

const PageSeparator = React.createClass({
	render: function(){
		return(
			<div className="page-separator">
			</div>
		)
	}
});

export { Page, PageHeader, PageTitle, PageContent, PageSection, PageSeparator };
