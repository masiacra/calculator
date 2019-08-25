import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "./Button";

class App extends Component {
	clickHandler = (event) => {
		const target = event.target;
		const content = target.innerText;
		console.log('ceeeeeeeb');
		this.props.setState(content);
	}
	render() {
		const { screen } = this.props;
		return (
			<div>
				<h1>{ screen }</h1>
				<Button
					content={'+'}
					handler={this.clickHandler}
				/>
			</div>
		);
	}
}

function setState(content) {
	return {
		type: 'SET_STATE',
		payload: content
	};
}

const mapStateToProps = state => {
	return {
		screen: state.screen
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setState: content => dispatch(setState(content))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
