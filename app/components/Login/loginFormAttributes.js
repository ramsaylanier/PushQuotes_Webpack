let loginFormAttributes = {
	fields: [
		{type: 'text', label: 'username', name: 'username',  className:'full-width input-field'},
		{type: 'password', label:"password",  className:'full-width input-field', name: 'password'},
		{type: 'submit', value: 'Login', className: 'full-width'}
	],
	type: 'login',
	animateIn: false,
	className: 'login-form center-form tight-form white-bg',
	onSubmit: function(e){
		e.preventDefault();

		var userName = $(e.target).find('[name="username"]').val();
		var password = $(e.target).find('[name="password"]').val();

		if (!userName){
			Alerts.throw('Please enter a username', 'error');
			return false;
		}

		if (!password){
			Alerts.throw('Please enter a password', 'error');
			return false;
		}

		Meteor.loginWithPassword(userName, password, function(error, result){
			if (error)
				Alerts.throw(error, 'error')
			else{
				AnimateItem($('.page'), PageAnimations.animateOut)

				Meteor.setTimeout(function(){
					FlowRouter.go('/' + userName);
				}, 500);
			}
		})
	}
};

export default loginFormAttributes;
