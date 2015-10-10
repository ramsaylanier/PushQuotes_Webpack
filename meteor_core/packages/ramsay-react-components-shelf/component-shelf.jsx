Shelf = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		return{
			loggedIn: Meteor.user()
		}
	},
	componentDidMount(){
		var shelf = React.findDOMNode(this.refs.shelf);
		var page = $('.page');
		var overlay = $('<div class="overlay"></div>');
		var header = $('.app-header');

		page.append(overlay);

		TweenMax.to(page, .5, {
			x: "-80%",
			ease: Power4.easeOut
		});

		TweenMax.to(header, .5, {
			x: "-80%",
			ease: Power4.easeOut
		});

		TweenMax.to(overlay, .5, {
			opacity: .8,
			ease: Power4.easeOut
		});

		$('.shelf .nav-item').on('click', function(e){
			ToggleShelf();
		})
	},
	componentWillUnmount(){
		var overlay = $('.application .overlay');
		overlay.remove();
	},
	render(){
		return(
			<div ref="shelf" className="shelf">
				{Navs.map(function(nav){
					if (nav.location == 'shelf'){
						console.log(nav);
						console.log(nav.navItems());
						return <NavList key={nav.name} navItems={nav.navItems()} navType={nav.name}/>
					}
				})}
			</div>
		)
	}
});

ToggleShelf = function(){
	var application = $('.application');
	var toggle = $('.nav-toggle');
	var nav = $('.mobile-nav');
	toggle.toggleClass('active');
	nav.toggleClass('active');
	application.toggleClass('shelf-active');

	if (nav.hasClass('active')){
		var shelf = $('<div id="shelf-container"></div>');
		$('main').append(shelf);

		React.render(
			<Shelf/>,
			shelf.get(0)
		)
	} else {
		var page = $('.page');
		var header = $('.app-header');
		var overlay = page.children('.overlay');

		TweenMax.to(page, .3, {
			x: "0%"
		});

		TweenMax.to(header, .3, {
			x: "0%"
		});

		TweenMax.to(overlay, .3, {
			opacity: 0
		});

		Meteor.setTimeout(function(){
			React.unmountComponentAtNode($('#shelf-container').get(0));
			$('#shelf-container').remove();
			page.css({
				transform: ''
			});
		}, 350);
	}
}