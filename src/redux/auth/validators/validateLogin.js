import { isEmailValid } from '../../../utility';

export const loginValidate = (value, field, error) => {
  if (!value) {
    error.error = true;
    error.message = `${field.toUpperCase()} is Required`;
  } else {
    switch (field) {
      case 'email':
        if (!value || !isEmailValid(value)) {
          error.error = true;
          error.message = 'Invalid Email';
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
