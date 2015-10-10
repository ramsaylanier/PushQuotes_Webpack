import React from 'react';
import styles from './toggle.scss';
import Toggle from './toggle.jsx';

const ModalToggle = React.createClass({

	handleClick(){
		let modal = this.props.modal;
		let currentState = AppState.get() || {modal: modal};
		let updatedState = _.extend(currentState, {modal: modal});

		AppState.set(updatedState);
	},

	render(){
		let type = this.props.type || 'add';

		return (
			<Toggle type={type} action={this.handleClick}/>
		)
	}
});

export default ModalToggle;
