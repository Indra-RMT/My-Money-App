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

export const nowDate = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Agust', 'September', 'October', 'November', 'December'];
  const myDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  var thisDay = date.getDay(),
  thisDay = myDays[thisDay];
  const yy = date.getYear();
  const year = (yy < 1000) ? yy + 1900 : yy;
  return `${thisDay}, ${day} ${months[month]} ${year}`;
}

export const toCommas = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const unixToMMDDYYYY = (unix) => {
  const ts_ms = unix;
  const date_ob = new Date(ts_ms);
  const year = date_ob.getFullYear();
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  const date = ("0" + date_ob.getDate()).slice(-2);

  return `${month}/${date}/${year}`;
}