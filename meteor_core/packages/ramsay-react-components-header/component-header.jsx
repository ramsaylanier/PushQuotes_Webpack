Header = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		return{
			loggedIn: Meteor.user()
		}
	},
	render: function(){
		return (
			<header className={this.props.className}>
				<div className="wrapper">
					<Logo/>
					{Navs.map(function(nav){
						if (nav.location == 'header'){
							return <NavList key={nav.name} navItems={nav.navItems()} navType={nav.name}/>
						}
					})}

					{this.props.children}
				</div>
			</header>
		)
	}
});

LogoIcon = null;

Logo = React.createClass({
	render: function(){
		var logo = getLogoSettings();
		var href = Meteor.user() ? "/" + Meteor.user().username : '/login';

		return (
			<a className="logo home-link transition-link" href={href}>{logo}</a>
		)
	}
});

var getLogoSettings = function(){
	return Settings.LogoIcon;
}