import React, {Component} from 'react';
import InputType from "./inputs.jsx";
import styles from "./form.scss";

// Write your package code here!
const Form = React.createClass({

	componentDidMount(){
		if (this.props.attributes.animateIn){
			var item = this.getDOMNode();

			$(item).velocity({
				opacity: [1,0],
				translateY: [0, centerY]
			}, 1000, [300, 20])
		}
	},

	render(){
		let fields = this.props.attributes.fields;
		let className = this.props.attributes.className ? styles[this.props.attributes.className] : styles.base;
		return(
			<form {...this.props.attributes} className={className} >
				{fields.map( field => {
					return <InputType key={field.id} {...field}/>
				})}
			</form>
		)
	}
});

export default Form;
