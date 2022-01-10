import { Button, Col, FormGroup, Input, Row } from 'reactstrap';
import { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { createRequest } from '../../../../redux/product/actions';
import { productInputField } from '../../../../utility/constants';
const CreateProduct = () => {
  const dispatch = useDispatch();

  const createdProduct = useRef({});

  const { iscreateRequest, isCreateSuccess, userProducts } = useSelector(
    (store) => store.product
  );

  const [successMessage, setSuccessMessage] = useState({
    isSuccessMessage: '',
  });

  useEffect(() => {
    const copySuccessMessage = _.cloneDeep(successMessage);
    if (isCreateSuccess) {
      copySuccessMessage.isSuccessMessage = userProducts.message;
      setSuccessMessage(copySuccessMessage);
    }
  }, [isCreateSuccess]);

  const handleInput = (field, value) => {
    createdProduct.current[field] = value;
  };

  const handleSubmit = () => {
    const payload = createdProduct.current;
    dispatch(createRequest(payload));
    console.log(payload, 'payload');
  };

  return (
    <div>
      <div style={{ margin: 85 }}>
        <h1 style={{ margin: '30px 0' }}>Create Product</h1>
        <Row>
          <Col md={6}>
            {productInputField.map(({ field, type, placeholder }) => (
              <FormGroup key={field}>
                <Input
                  placeholder={placeholder}
                  name={field}
                  type={type}
                  onBlur={(e) => handleInput(field, e.target.value)}
                />
              </FormGroup>
            ))}

            <Button onClick={handleSubmit} style={{ float: 'right' }}>
              Submit
            </Button>
            {successMessage != '' ? (
              <p style={{ color: 'green', margin: '10px 20px' }}>
                {successMessage.isSuccessMessage}
              </p>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CreateProduct;
