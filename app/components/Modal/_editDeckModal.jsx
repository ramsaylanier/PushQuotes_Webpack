import React from 'react';
import Form from '../Form/form.jsx';
import DeleteDeckButton from '../Button/deleteDeckButton.jsx';
import DuplicateDeckButton from '../Button/duplicateDeckButton.jsx';
import { editDeckForm } from '../Form/Forms.js';
import wrapperStyles from '../../Stylesheets/wrapper.scss';

const EditDeckModal = React.createClass({

  componentWillMount(){
    if (this.props.deck){
      let deck = this.props.deck;
  		editDeckForm.fields[0].value = deck.title;
  		editDeckForm.fields[1].value = deck.slug;
  		editDeckForm.fields[2].value = deck.description;
  		editDeckForm.fields[3].value = deck.hashtags;
  		editDeckForm.fields[4].value = deck.image;
  		editDeckForm.fields[5].checked = deck.withSlides;
  		editDeckForm.deckId = deck._id;
  	}
  },

  render(){

  	let wrapperClassName = wrapperStyles.form__white;
    let deckPage = FlowRouter.getRouteName() === 'deckPage';
    let deck = this.props.deck;

    console.log(FlowRouter);

    return (
      <div className={wrapperClassName}>
      	 <Form attributes={editDeckForm}/>
      	 <div className="flex-container">
           {!deckPage && <DuplicateDeckButton deck={deck}/> }
      		 <DeleteDeckButton deck={deck}/>
      	 </div>
      </div>
  	)
  }
});

export default EditDeckModal;
