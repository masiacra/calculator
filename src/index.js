import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";

const initialState = {
	screen: 0
};

function reducer(state=initialState, action) {
	switch (action.type) {
		case ('SET_STATE'):
			return {...state, screen: action.payload};
		default:
			return state;
	}
}

const store = createStore(reducer, initialState);


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
