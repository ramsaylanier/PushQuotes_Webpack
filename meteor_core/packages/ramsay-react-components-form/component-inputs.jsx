InputType = React.createClass({
	getInitialState: function(){
		return {value: this.props.value, checked: this.props.checked}
	},
	componentDidMount: function(){
		var control = $(this.getDOMNode());
		var input = control.find('.input-field');
		var label = input.prev('label');

		if (!input.length || !label.length){
			return false;
		} else if (input && input.val().length > 0){
			this.activateField();
		}
	},	
	handleChange: function(e){
		if (this.props.type == 'checkbox'){
			this.setState({checked: e.target.checked})
		} else {
			this.setState({value: e.target.value});
		}
	},
	activateField: function(e){
	 	var control = $(this.getDOMNode());
		var input = control.find('.input-field');
		var label = input.prev('label');

		this.setState({isFocused:true});

		TweenMax.to(label, .3, {
			y: -input.outerHeight() + label.outerHeight(),
			ease: Power2.easeOut
		})
	},
	deactivateField: function(e){
		var control = $(this.getDOMNode());
		var input = control.find('.input-field');
		var label = input.prev('label');

		if (input.val().length == 0){
			this.setState({isFocused:false});

			TweenMax.to(label, .3, {
				y: 0,
				ease: Power4.easeOut
			});
		}
	},
	render: function(){
		var hasLabel = this.props.label;
		var isTextArea = this.props.type == 'textarea';
		var isRange = this.props.type == 'range';
		var value = this.state.value;

		return (
			<div 
				className={"form-control " + this.props.visibility + " " + this.props.type + "-control"}
				ref="formControl"
			>
					{ hasLabel && <Label {...this.props} /> }
					{ isTextArea ?
						<textarea
							{...this.props} 
							value={value}
							onChange={this.handleChange}
						>
							{value}
						</textarea> :
						<input 
							{...this.props}
							value={value}
							checked={this.state.checked}
							onFocus={this.activateField}
							onBlur={this.deactivateField}
							onChange={this.handleChange} />
					}

					{isRange && 
						<output>{value || this.props.max / 2}</output>
					}
				<span 
					className="input-overlay"
				>
				</span>
			</div>
		)
	}
});