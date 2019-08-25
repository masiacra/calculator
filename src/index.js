import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";

const initialState = {
	firstNumber: 0,
	secondNumber: '',
	sign: '',
	isResult: false,
	isError: ''
};

function calculate(first, second, sign) {
	if (sign === '+') {
		return Number(first) + Number(second);
	} else if (sign === '-') {
		return Number(first) - Number(second);
	} else if (sign === '*') {
		return first * second;
	} else {
		if (Number(second) === 0) {//на ноль делить нельзя
			return 'Error';
		}
		return first / second;
	}
}


function reducer(state=initialState, action) {
	const { firstNumber, secondNumber, sign, isResult } = state;
	const payload = action.payload;
	switch (action.type) {
		case 'SET_NUMBER':	
			//Ситуация, когда у нас определено первое числои знак действия
			if (firstNumber && sign) {
				const newSecondNumber = secondNumber + payload;
				return {...state, secondNumber: newSecondNumber};
			} else {//определяем первое число
				if (firstNumber === 0) {//если первое число ноль, то заменяем его
					return {...state, firstNumber: payload};
				} else if (firstNumber !== 0 && !isResult) { //смотрим ситуацию, когда нажали равно и вводим следующее число
					const newFirstNumber = firstNumber + payload;
					return {...state, firstNumber: newFirstNumber};
				} else {
					return {...state, firstNumber: payload, isResult: false};
				}
			}
		case 'SET_SIGN':
			if (secondNumber) { //если определено второе число, то считаем результат, первое число делаем
				//равным результату, а знак определяем 
				const result = calculate(firstNumber, secondNumber, sign);
				return {...state, firstNumber: result, sign: payload, secondNumber: '', isResult: true};
			} else {//если второе число не определено, то просто заменяем знак действия
				return {...state, sign: payload};
			}
		case 'GET_RESULT':
			//нажатие на равно
			if (secondNumber && sign) {
				const result = calculate(firstNumber, secondNumber, sign);
				return {...state, firstNumber: result, secondNumber: '', sign: '', isResult: true};
			} else { //ситуация, когда пользователь нажимает повторно равенство - ничего не происходит
				return state;
			}
		case 'CLEAR_SCREEN':
			//нажатие на клавишу "C"
			return {...state, firstNumber: 0, secondNumber: '', sign: ''}; 
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
