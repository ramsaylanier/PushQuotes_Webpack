// Write your package code here!
Form = React.createClass({
	componentDidMount(){
		if (this.props.attributes.animateIn){
			var item = this.getDOMNode();

			$(item).velocity({
				opacity: [1,0],
				translateY: [0, centerY]
			}, 1000, [300, 20])
		}
	},
	submit(e){
		this.props.onSubmit(e);
	},
	render(){
		var fields = this.props.attributes.fields;
		return(
			<form {...this.props.attributes}>
				{fields.map(function(field){
					return <InputType key={field.id} {...field}/>
				})}
			</form>
		)
	}
});