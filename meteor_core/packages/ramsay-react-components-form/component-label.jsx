Label = React.createClass({
	render: function(){
		return (
			<label name={this.props.name + '-label'} className='floating-label'>
				{this.props.label}
			</label>
		)
	}
});