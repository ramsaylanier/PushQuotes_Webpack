// Write your package code here!

Components = {
	Settings: {}
}

Settings = {
	LogoIcon: 'Change me',
	AnimatePages: true
};

Animations = {}

AnimateItem = function(item, animation){
	TweenMax.to(item, animation.duration, animation.properties)
}