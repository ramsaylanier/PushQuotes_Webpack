import React from 'react';
import Form from '../Form/form.jsx';
import { newQuoteForm } from '../Form/Forms.js';
import wrapperStyles from '../../Stylesheets/wrapper.scss';

const AddQuoteModal = React.createClass({

	render() {

    let wrapperClassName = wrapperStyles.form__white;
    newQuoteForm.fields[2].value = Quotes.find().count() + 1;

    return(
			<div className={wrapperClassName}>
				<Form attributes= {newQuoteForm} />
			</div>
    )
  }
});

export default AddQuoteModal;
