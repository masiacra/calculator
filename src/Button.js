import React from "react";

function Button(props) {
	const {content, handler} = props;
	return (
		<button onClick={handler}>
			{content}
		</button>
	);
}

export default Button;
