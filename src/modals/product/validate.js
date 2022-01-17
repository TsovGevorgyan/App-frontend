import { isFileValid } from '../../utility';

export const Validate = (value, field, error, defaultValue) => {
  console.log('defaultValue', defaultValue);
  console.log('value', value);
  if (!value) {
    error.error = true;
    error.message = `${field.toUpperCase()} is Required`;
    console.log(`${value} is empty`);
  } else if (value && defaultValue && defaultValue === value) {
    error.error = true;
    error.message = `${field.toUpperCase()} must be changed`;
  } else {
    switch (field) {
      case 'file':
        if (value && !isFileValid(value)) {
          error.error = true;
          error.message = 'Invalid Image Type';
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
