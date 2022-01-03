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

const EditProductModal = ({ show, onClose, submit, row }) => {
  const editData = useRef({});

  const handleInputChange = (field, value) => (editData.current[field] = value);

  const handleSubmit = () => submit(editData.current, row.id);

  return (
    <div>
      <Modal toggle={onClose} isOpen={show}>
        <ModalHeader toggle={onClose}>Modal title</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Input
              onBlur={(e) => handleInputChange('name', e.target.value)}
              defaultValue={row.name}
            />
          </FormGroup>
          <FormGroup>
            <Input
              onBlur={(e) => handleInputChange('description', e.target.value)}
              defaultValue={row.description}
            />
          </FormGroup>
          <FormGroup>
            <Input
              onBlur={(e) => handleInputChange('price', e.target.value)}
              defaultValue={row.price}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Do Something
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditProductModal;
