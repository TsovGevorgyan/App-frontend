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
export const productInputField = [
  {
    field: 'name',
    type: '',
    placeholder: 'Name',
    defaultValue: '',
  },
  {
    field: 'description',
    type: '',
    placeholder: 'Description',
    defaultValue: '',
  },
  {
    field: 'price',
    type: 'number',
    placeholder: 'Price',
    defaultValue: '',
  },
];
export const tableRowsOptions = [
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];
export const searchFields = [
  {
    placeholder: 'Enter Product Name',
    field: 'name',
  },
  {
    placeholder: 'Enter Min Product Price',
    field: 'priceMin',
  },
  {
    placeholder: 'Enter Max Product Price',
    field: 'priceMax',
  },
];
export const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const regexUserName = /^[a-zA-Z0-9]{1,20}$/;
