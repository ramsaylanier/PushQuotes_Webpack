import React from 'react';
import { Page, PageContent } from '../Page/page.jsx';

import Form from '../Form/form.jsx';
import viewPresentationForm from  '../Form/_viewPresentationFormAttributes.js';
import loginFormAttributes from '../Login/loginFormAttributes.js';

const Login = React.createClass({
	render(){
		return (
			<Page backgroundImage={'/img/login-bg.jpg'}>
				<PageContent>
					<div className="wrapper form-wrapper white-bg">
						<Form attributes={loginFormAttributes}/>
						<button onClick={twitterLogin} className="btn twitter-btn full-width">Login With Twitter</button>
						<p>No account? <a href='/register' className="transition-link">Register</a></p>

						<a className="small render-form" onClick={renderForgotPasswordForm}>Forgot password</a>
					</div>

					<div className="wrapper form-wrapper white-bg">
						<Form attributes={viewPresentationForm}/>
					</div>
				</PageContent>
			</Page>
		)
	}
});

let renderForgotPasswordForm = (e =>{
	e.preventDefault();

	$('.page .wrapper').append('<div id="forgot-password-form-wrapper"></div>');

	React.render(
		<div>
			<Form attributes={forgotPasswordFormAttributes} />
		</div>,
		document.getElementById('forgot-password-form-wrapper')
	);
});


let twitterLogin = ()=>{
	var loginStyle = 'popup';
	var device = Session.get('device');

	Meteor.loginWithTwitter({loginStyle: loginStyle}, function(error, result){
		if (error){
			Alerts.throw(error, 'error');
		}
		else{
			FlowRouter.go('/' + Meteor.user().username);
		}
	});
};

export default Login;
