import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  FormGroup,
} from 'reactstrap';
import { useMemo, useRef } from 'react';
import ImageUploader from 'react-images-upload';
import { productsInput } from '../../utility/inputes';

const ProductModal = ({ show, onClose, submit, row }) => {
  const editData = useRef({});

  const handleInputChange = (field, value) => {
    editData.current[field] = value;
    console.log(editData.current);
  };

  const handleSubmit = () => submit(editData.current, row.id);

  const inputs = useMemo(() => productsInput(row), [row]);

  return (
    <div>
      <Modal toggle={onClose} isOpen={show}>
        <ModalHeader toggle={onClose}>Modal title</ModalHeader>
        <ModalBody>
          {inputs.map(({ field, placeholder, type, defaultValue }) => (
            <FormGroup key={field}>
              <ImageUploader
                withIcon={false}
                withPreview={true}
                label=""
                buttonText="Upload Images"
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif', '.svg']}
                maxFileSize={1048576}
                fileSizeError=" file size is too big"
              />
              <Input
                placeholder={placeholder}
                name={field}
                type={type}
                onBlur={(e) => handleInputChange(field, e.target.value)}
                defaultValue={defaultValue}
              />
            </FormGroup>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Edit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
{
  /*<FormGroup>*/
}
{
  /*  <Input*/
}
{
  /*    placeholder="Name"*/
}
{
  /*    name="name"*/
}
{
  /*    onBlur={(e) => handleInputChange('name', e.target.value)}*/
}
{
  /*    defaultValue={row.name}*/
}
{
  /*  />*/
}
{
  /*</FormGroup>*/
}
{
  /*<FormGroup>*/
}
{
  /*  <Input*/
}
{
  /*    placeholder="Description"*/
}
{
  /*    name="description"*/
}
{
  /*    onBlur={(e) => handleInputChange('description', e.target.value)}*/
}
{
  /*    defaultValue={row.description}*/
}
{
  /*  />*/
}
{
  /*</FormGroup>*/
}
{
  /*<FormGroup>*/
}
{
  /*  <Input*/
}
{
  /*    placeholder="Price"*/
}
{
  /*    name="price"*/
}
{
  /*    type="number"*/
}
{
  /*    onBlur={(e) => handleInputChange('price', e.target.value)}*/
}
{
  /*    defaultValue={row.price || ''}*/
}
{
  /*  />*/
}
{
  /*</FormGroup>*/
}
export default ProductModal;
