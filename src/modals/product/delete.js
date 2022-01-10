import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  FormGroup,
} from 'reactstrap';
import { useRef } from 'react';

const deleteProductModal = ({ show, onClose, submit, row }) => {
  const deleteData = useRef({});

  // const handleInputChange = (field, value) =>
  //   (deleteData.current[field] = value);

  const handleSubmit = () => {
    submit(row.id);
  };

  return (
    <div>
      <Modal toggle={onClose} isOpen={show}>
        <ModalHeader toggle={onClose}>Modal title</ModalHeader>
        <ModalBody>
          <h1>Are you sure you want to delete product?</h1>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Delete
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default deleteProductModal;
