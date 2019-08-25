import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "./Button";
import Screen from "./Screen";

class App extends Component {
	clickHandler = (event) => {
		const target = event.target;
		const content = target.innerText;
		if (content === '=') {
			this.props.getResult();
		} else if (content === 'C') {
			this.props.clearScreen();
		} else if (content === '.') {
			this.props.setNumber(content);
		} else if (isNaN(content)) {
			this.props.setSign(content);
		} else {
			this.props.setNumber(content);
		}
	}
	

	render() {
		const buttons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+', '-', '*', '/', 'C', '=', '.'].map( (number, ind) => {
			return <Button 
					 key={ind}
					 content={number} 
					 handler={this.clickHandler} 
				   />;
		});
		const { firstNumber, secondNumber, sign } = this.props;
		return (
			<div>
				<Screen 
					firstNumber={firstNumber}
					secondNumber={secondNumber}
					sign={sign}
				/>
				{ buttons }
			</div>
		);
	}
}

function setNumber(content) {
	return {
		type: 'SET_NUMBER',
		payload: content
	};
}

function setSign(content) {
	return {
		type: 'SET_SIGN',
		payload: content
	};
}

function getResult() {
	return {
		type: 'GET_RESULT'
	};
}

function clearScreen() {
	return {
		type: 'CLEAR_SCREEN'
	};
}

const mapStateToProps = state => {
	return {
		firstNumber: state.firstNumber,
		secondNumber: state.secondNumber,
		sign: state.sign
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setNumber: content => dispatch(setNumber(content)),
		setSign: content => dispatch(setSign(content)),
		getResult: () => dispatch(getResult()),
		clearScreen: () => dispatch(clearScreen())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
