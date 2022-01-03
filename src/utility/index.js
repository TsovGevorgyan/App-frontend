import { regexEmail, regexUserName } from './constants';

export const isEmailValid = (value) => regexEmail.test(value);
export const isUserNameValid = (value) => regexUserName.test(value);
