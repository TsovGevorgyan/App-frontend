import { FaEdit } from 'react-icons/fa';
import { FiDelete } from 'react-icons/fi';
import { fileUrl } from '../configs';

export const productColumns = ({ handleDelete, handleModalOpen }) => {
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
      name: 'image',
      selector: (row) => (
        <div>
          {row.File ? (
            <img className="product image" src={`${fileUrl}/${row.File.src}`} />
          ) : (
            ''
          )}
        </div>
      ),
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
            onClick={() => handleModalOpen(row.id)}
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
