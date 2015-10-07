import React from 'react';
import Form from '../Form/form.jsx';
import { newQuoteForm } from '../Form/Forms.js';
import wrapperStyles from '../../Stylesheets/wrapper.scss';
import Quotes from '../../collections/quotes.js';

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
