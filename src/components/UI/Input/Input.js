import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';

import classes from './Input.css';
import { updateObject } from './../../../shared/utility';

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

	const allowOnlyNumber = (event) => {
		const value = event.target.value;
		const numberOnly = updateObject(event, {
			target: updateObject(event.target, {
				value: value.replace(/[^0-9]+/g, "")
			})
		});
		return numberOnly;
	}

	switch (props.elementType) {
		case ('input'):
			inputElement = <input
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={(event) => props.elementConfig.type === 'number' ? 
					props.changed(allowOnlyNumber(event)) : 
					props.changed(event)}
				onBlur={() => setIsFocus(true)} />;
			break;
		case ('textarea'):
			inputElement = <textarea
				className={[classes.Textarea, inputClasses].join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}
				rows={3}
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
		case ('datePicker'):
			inputElement = (
				<React.Fragment>
					<DatePicker
						className={[classes.DatePicker, inputClasses].join(' ')}
						wrapperClassName={classes.datePicker}
						{...props.elementConfig}
						selected={new Date(+props.value)}
						onChange={date => {
							if (date === null) {
								date = new Date();
							}
							props.changed({target:{value:date}})
						}}
						onBlur={() => setIsFocus(true)} />
					<div></div>
				</React.Fragment>
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
	if (isFocus || props.isValid) {
		errorMessage = props.errorMessage;
	}

	if (!isFocus && !props.isValid && props.errorMessage == 'input required') {
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