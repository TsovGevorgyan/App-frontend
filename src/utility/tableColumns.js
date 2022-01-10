import { FaEdit } from 'react-icons/fa';
import { FiDelete } from 'react-icons/fi';
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
          {/*<Delete onClick={() => handleDelete(row)} />*/}

          <FaEdit
            style={{
              fontSize: '28px',
              color: '#462e66',
              opacity: '0.7',
              margin: 10,
              cursor: 'pointer',
            }}
            onClick={() => handleEdit(row)}
          />
          <FiDelete
            style={{
              fontSize: '28px',
              color: '#462e66',
              opacity: '0.7',
              margin: 10,
              cursor: 'pointer',
            }}
            onClick={() => handleDelete(row)}
          />
        </div>
      ),
    },
  ];
};
