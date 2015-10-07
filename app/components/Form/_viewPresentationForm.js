let viewPresentationForm = {
	fields: [
		{
			id: 1,
			type: 'text',
			name: 'presentation-key-field',
			className:['field','full'],
			label:'Presentation Key'
		},
		{
			id: 2,
			type: 'submit',
			className: ['submit'],
			value: 'View Presentation'
		}
	],
	onSubmit: function(e){
		e.preventDefault();
		var presentationKey = $(e.currentTarget).find('[name=presentation-key-field]').val();

		Meteor.call('viewPresentation', presentationKey, function(err, res){
			if(err){
				Alerts.throw(err, 'error')
			} else {
				FlowRouter.go('/' + res)
			}
		})
	}
}

export default viewPresentationForm;
