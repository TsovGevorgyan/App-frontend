import { isEmailValid, isUserNameValid } from '../../../utility';

export const registerValidate = (value, field, error, currentValues) => {
  if (!value) {
    error.error = true;
    error.message = `${field.toUpperCase()} is Required`;
    console.log('errors', error);
  } else {
    switch (field) {
      case 'firstName':
      case 'lastName':
        if (!value || !isUserNameValid(value)) {
          error.error = true;
          error.message = 'Username must only contain alphanumeric characters';
        } else {
          error.error = false;
          error.message = '';
        }
        break;
      case 'email':
        if (!value || !isEmailValid(value)) {
          error.error = true;
          error.message = 'Invalid Email';
          console.log('email value', value);
        } else {
          error.error = false;
          error.message = '';
        }
        break;
      case 'password_confirmation':
        if (!value || currentValues.current.password !== value) {
          error.error = true;
          error.message = 'Passwords does not match';
        } else {
          error.error = false;
          error.message = '';
        }
        break;
      default:
        if (!value) {
          error.error = true;
          error.message = `${field.toUpperCase()} is Required`;
        } else {
          error.error = false;
          error.message = '';
        }
    }
  }
};
