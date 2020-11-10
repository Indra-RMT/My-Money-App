export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};

export const checkValidity = ( value, rules ) => {
  let isValid = true;
  let errorMessage = null;
  let isMinLengthValid = false;
  if ( !rules ) {
    return [isValid, errorMessage];
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
    if (isValid === false) {
      errorMessage = 'input required';
    }
  }

  if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
		if (isValid === false) {
      errorMessage = `minimal character is ${rules.minLength}`;
    } else {
      isMinLengthValid = true;
    }
  }

  if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
		if (isValid === false && isMinLengthValid) {
      errorMessage = `maximal character is ${rules.maxLength}`;
    }
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isValid = pattern.test( value ) && isValid;
		if (isValid === false) {
      errorMessage = `email not valid`;
    }
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
		isValid = pattern.test( value ) && isValid;
		if (isValid === false) {
      errorMessage = `input not numeric`;
    }
  }

  return [isValid, errorMessage];
}
