import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  FormGroup,
  FormFeedback,
} from 'reactstrap';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { productsInput } from '../../utility/inputes';
import { fileUrl } from '../../configs';
import { removeFileRequest } from '../../redux/file/actions';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Validate } from './validate';
import { cloneDeep } from 'lodash/lang';

const initialError = {
  name: { error: true, message: 'Product Name is required' },
  description: { error: true, message: 'Product Description is required' },
  price: { error: true, message: 'Product Price is required' },
  file: {
    error: true,
    message: 'Product Image is required',
  },
};

const ProductModal = ({ show, onClose, submit, productId, isEdit }) => {
  const inputImageRef = useRef(null);
  const dispatch = useDispatch();

  const { userProducts } = useSelector((store) => store.product);

  const [formErrors, setFormErrors] = useState({
    name: { error: !isEdit, message: 'Product Name is required' },
    description: { error: !isEdit, message: 'Product Description is required' },
    price: { error: !isEdit, message: 'Product Price is required' },
    file: {
      error: !isEdit,
      message: 'Product Image is required',
    },
  });
  console.log(formErrors);
  const [isShowErrors, setIsShowErrors] = useState(false);

  const row = useMemo(() => {
    return userProducts?.find((item) => item.id === productId) || {};
  }, [userProducts, productId]);

  const [data, setData] = useState(row);

  const validateInput = (value, field, defaultValue) => {
    const error = _.cloneDeep(formErrors[field]);
    Validate(value, field, error, defaultValue);
    setFormErrors((prevState) => ({ ...prevState, [field]: error }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key]) formData.set(key, data[key]);
    });
    setIsShowErrors(true);
    if (!Object.values(formErrors).some((item) => item.error)) {
      submit(row.id, formData);
    }
  };

  const handleDelete = () => {
    const payload = { id: row.File.id, type: 'product' };
    dispatch(removeFileRequest(payload));
  };

  const inputs = useMemo(() => productsInput(row), [row]);

  const handleChange = useCallback((field, value) => {
    setData((state) => ({
      ...state,
      [field]: value,
    }));
  }, []);

  const handleAddImage = useCallback(() => {
    inputImageRef.current.click();
  }, []);

  // useEffect(() => {
  //   if (Object.keys(row).length !== 0) {
  //     const copyErr = {
  //       ...initialError,
  //     };
  //     const copyErr = cloneDeep(formErrors)
  //     for(const [key, value] of Object.entries(copyErr)){
  //         key
  //     }
  //     copyErr.name.error = data.name;
  //     copyErr.name.message = 'Product Name must be changed';
  //     copyErr.description.error = data.description;
  //     copyErr.description.message = 'Product Description must be changed';
  //     copyErr.price.error = data.price;
  //     copyErr.price.message = 'Product Price must be changed';
  //     copyErr.file.error = data.file;
  //     copyErr.price.message = 'Product File must be changed';
  //     setFormErrors(copyErr);
  //   }
  // }, [row]);

  return (
    <div>
      <Modal toggle={onClose} isOpen={show}>
        <ModalHeader toggle={onClose}>Modal title</ModalHeader>
        <ModalBody>
          {inputs.map(({ field, type, placeholder, defaultValue }) => {
            if (type === 'file') {
              if (row.id) {
                if (!row.File) {
                  return (
                    <div>
                      <FormGroup key={field}>
                        <Input
                          type={type}
                          name={field}
                          innerRef={inputImageRef}
                          style={{ display: 'none' }}
                          defaultValue={defaultValue}
                          onBlur={(e) =>
                            validateInput(
                              e.target.files[0],
                              field,
                              defaultValue
                            )
                          }
                          onChange={(e) =>
                            handleChange(field, e.target.files[0])
                          }
                          invalid={isShowErrors && formErrors[field].error}
                        />
                        <Button onClick={handleAddImage}>Add Image</Button>
                        <FormFeedback>{formErrors[field].message}</FormFeedback>
                      </FormGroup>
                    </div>
                  );
                }
                return (
                  <div className="modals img">
                    <img
                      className="product image"
                      src={`${fileUrl}/${defaultValue}`}
                    />
                    <div className="icon content" style={{ display: 'none' }}>
                      <AiOutlineDelete
                        onClick={handleDelete}
                        style={{ fontSize: 28, cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div>
                    <FormGroup key={field}>
                      {console.log(formErrors)}
                      <input
                        type={type}
                        name={field}
                        ref={inputImageRef}
                        style={{ display: 'none' }}
                        onBlur={(e) =>
                          validateInput(e.target.files[0], field, defaultValue)
                        }
                        onChange={(e) => handleChange(field, e.target.files[0])}
                        invalid={isShowErrors && formErrors[field].error}
                      />
                      <FormFeedback>{formErrors[field].message}</FormFeedback>
                    </FormGroup>
                    <Button onClick={handleAddImage}>Add Image</Button>
                  </div>
                );
              }
            }

            return (
              <div>
                <FormGroup key={field}>
                  <Input
                    type={type}
                    name={field}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onBlur={(e) =>
                      validateInput(e.target.value, field, defaultValue)
                    }
                    onChange={(e) => handleChange(field, e.target.value)}
                    invalid={isShowErrors && formErrors[field].error}
                  />
                  <FormFeedback>
                    {console.log('isShowErrors1111111', isShowErrors)}
                    {formErrors[field].message}
                  </FormFeedback>
                </FormGroup>
              </div>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            {productId ? 'Edit' : 'Add'}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ProductModal;
