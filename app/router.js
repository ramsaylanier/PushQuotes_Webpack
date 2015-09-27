FlowRouter.route('/', {
	triggersEnter: [function(context, redirect){
		if (!Meteor.user()){
			redirect('/login');
		} else (
			redirect('/' + Meteor.user().username)
		)
	}]
})
