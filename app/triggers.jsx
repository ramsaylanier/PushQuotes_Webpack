import React from 'react';

//collections
import Quotes from './collections/quotes.js';

//components
import { Modal } from './components/Modal/modal.jsx';
import Form from './components/Form/form.jsx';
import DeleteDeckButton from './components/Button/deleteDeckButton.jsx';
import DuplicateDeckButton from './components/Button/duplicateDeckButton.jsx';
import DeleteQuoteButton from './components/Button/deleteQuoteButton.jsx';

//forms
import { newDeckForm, editDeckForm, editQuoteForm } from './components/Form/Forms.js';

//styles
import wrapperStyles from './Stylesheets/wrapper.scss';


const EditQuoteTrigger = props => {
	let modal = $('<div class="modal__container"></div>');
	$('#react-root').append(modal);

	let wrapperClassName = wrapperStyles.form__white

	React.render(
		<Modal>
			 <Form attributes={editQuoteForm} />
				<div className="flex-container items-centered space-between no-margin">
				 <DeleteQuoteButton quote={props} />
			 </div>
		</Modal>,
		modal.get(0)
	)
}
