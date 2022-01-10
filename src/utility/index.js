import { regexEmail, regexUserName } from './constants';

export const removeEmptyItemsFromObject = (obj) => {
  for (const [key, value] of Object.entries(obj)) {
    if (!value) {
      delete obj[key];
    }
  }
};
export const isEmailValid = (value) => regexEmail.test(value);
export const isUserNameValid = (value) => regexUserName.test(value);
