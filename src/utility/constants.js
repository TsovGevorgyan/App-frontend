export const registerInputField = [
  {
    field: 'firstName',
    type: '',
    name: 'firstName',
    placeholder: 'First Name',
  },
  {
    field: 'lastName',
    type: '',
    name: 'lastName',
    placeholder: 'Last Name',
  },
  {
    field: 'email',
    type: '',
    name: 'email',
    placeholder: 'Email',
  },
  {
    field: 'password',
    type: 'password',
    name: 'password',
    placeholder: 'Password',
  },
  {
    field: 'password_confirmation',
    type: 'password',
    name: 'password_confirmation',
    placeholder: 'Confirm Password',
  },
];

export const loginInputField = [
  {
    field: 'email',
    type: '',
    name: 'email',
    placeholder: 'Email',
  },
  {
    field: 'password',
    type: 'password',
    name: 'password',
    placeholder: 'Password',
  },
];
export const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const regexUserName = /^[a-zA-Z0-9]{1,20}$/;
