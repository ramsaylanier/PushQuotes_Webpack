import React from 'react';
import Form from '../Form/form.jsx';
import { newDeckForm } from '../Form/Forms.js';
import wrapperStyles from '../../Stylesheets/wrapper.scss';

const AddDeckModal = React.createClass({

  render(){

    let wrapperClassName = wrapperStyles.form__white;

  	return(
			<div className={wrapperClassName}>
				<Form attributes={newDeckForm} />
			</div>
  	)
  }
});

export default AddDeckModal;
