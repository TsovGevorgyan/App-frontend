export const productsInput = (row = {}) => [
  {
    field: 'name',
    type: '',
    placeholder: 'Name',
    defaultValue: row.name || '',
  },
  {
    field: 'description',
    type: '',
    placeholder: 'Description',
    defaultValue: row.description || '',
  },
  {
    field: 'price',
    type: 'number',
    placeholder: 'Price',
    defaultValue: row.price || '',
  },
];
