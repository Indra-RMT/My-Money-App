import React, { useState } from 'react';

import classes from './Input.css';

const input = ( props ) => {
	const [isFocus, setIsFocus] = useState(false);

	let inputElement = null;
	const inputClasses = [classes.InputElement];

	if (!props.isValid && props.touched || props.errorMessage !== null) {
		inputClasses.push(classes.Invalid);
	}

	const labelClasses = [
		classes.Label,
		classes[props.label.type]
	].join(' ');

	switch (props.elementType) {
		case ('input'):
			inputElement = <input
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}
				onBlur={() => setIsFocus(true)} />;
			break;
		case ('textarea'):
			inputElement = <textarea
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}
				onBlur={() => setIsFocus(true)} />;
			break;
		case ('select'):
			inputElement = (
				<select
					className={inputClasses.join(' ')}
					value={props.value}
					onChange={props.changed}
					onBlur={() => setIsFocus(true)}>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = <input
				id={props.id}
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}
				onBlur={() => setIsFocus(true)} />;
	}

	let errorMessage = null;
	if (isFocus || !props.isValid) {
		errorMessage = props.errorMessage;
	}

	return (
		<div className={classes.Input}>
			<label className={labelClasses}>{props.label.text}</label>
			{inputElement}
			<label 
				htmlFor={props.id}
				className={classes.ErrorMessage}>{errorMessage}
			</label>
		</div>
	);
};

export default input;