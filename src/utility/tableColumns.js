import { FaEdit } from 'react-icons/fa';
export const productColumns = ({ handleDelete, handleEdit }) => {
  return [
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
    },
    {
      name: 'Actions',
      selector: (row) => (
        <div className="d-flex">
          <button onClick={() => handleDelete(row.id)}>delete</button>
          <FaEdit onClick={() => handleEdit(row)}>edit</FaEdit>
        </div>
      ),
    },
  ];
};
