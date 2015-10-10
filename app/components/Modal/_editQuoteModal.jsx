import React from 'react';
import Form from '../Form/form.jsx';
import { editQuoteForm } from '../Form/Forms.js';
import wrapperStyles from '../../Stylesheets/wrapper.scss';
import Quotes from '../../collections/quotes.js';
import DeleteQuoteButton from '../Button/deleteQuoteButton.jsx';

const EditQuoteModal = React.createClass({

	componentWillMount(){
		if (this.props.quote){
			let quote = this.props.quote;
			editQuoteForm.data = quote;
			editQuoteForm.fields[0].value = quote.text;
			editQuoteForm.fields[1].value = quote.slide;
			editQuoteForm.fields[2].value = quote.order || Quotes.find().count();
			editQuoteForm.fields[1].visibility = quote.withSlides ? 'visible' : 'hidden';
		}
	},

	render() {
		console.log('edit quote modal rendered');
    let wrapperClassName = wrapperStyles.form__white;

    return(
			<div className={wrapperClassName}>
				<Form attributes={editQuoteForm} />
	 			<div className="flex-container items-centered space-between no-margin">
					<DeleteQuoteButton quote={this.props.quote} />
				</div>
			</div>
    )
  }
});

export default EditQuoteModal;
