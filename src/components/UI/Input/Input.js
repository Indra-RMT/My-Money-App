import React from 'react';

import classes from './Input.css';

const input = ( props ) => {
	let inputElement = null;
	const inputClasses = [classes.InputElement];

	if (!props.isValid && props.touched || props.errorMessage !== null) {
		inputClasses.push(classes.Invalid);
	}

	const labelClasses = [
		classes.Label,
		classes[props.label.type]
	].join(' ');

	switch ( props.elementType ) {
		case ( 'input' ):
			inputElement = <input
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed} />;
			break;
		case ( 'textarea' ):
			inputElement = <textarea
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed} />;
			break;
		case ( 'select' ):
			inputElement = (
				<select
					className={inputClasses.join(' ')}
					value={props.value}
					onChange={props.changed}>
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
				onChange={props.changed} />;
	}

	return (
		<div className={classes.Input}>
			<label className={labelClasses}>{props.label.text}</label>
			{inputElement}
			<label htmlFor={props.id} className={classes.ErrorMessage}>{props.errorMessage}</label>
		</div>
	);
};

export default input;