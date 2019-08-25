import React from "react";

function Screen(props) {
	const { firstNumber, secondNumber, sign } = props;
	return (
		<h1>{ `${firstNumber}${sign}${secondNumber}` }</h1>
	);
}

export default Screen;
