import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  FormGroup,
  Input,
  Row,
  Button,
  FormFeedback,
  Spinner,
} from 'reactstrap';
import _ from 'lodash';
import './login.scss';
import { loginRequest } from '../../../redux/auth/actions';
import { loginInputField } from '../../../utility/constants';
import { loginValidate } from '../../../redux/auth/validators/validateLogin';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();

  const { isLoginFailure, loginErrorMessage, isLoginSuccess, userAccount } =
    useSelector((store) => store.auth);

  const [formErrors, setFormErrors] = useState({
    email: { error: true, message: 'Email is required' },
    password: { error: true, message: 'Password is required' },
  });

  const [successMessage, setSuccessMessage] = useState({
    successMessage: { state: false, message: '' },
  });

  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);

  const createData = useRef({});

  const history = useHistory();

  useEffect(() => {
    if (loginErrorMessage) {
      const copyFormErrors = _.cloneDeep(formErrors);
      for (const [field, error] of Object.entries(copyFormErrors)) {
        const value = createData.current;
        switch (field) {
          case 'email':
            if (!value || loginErrorMessage['email'] !== undefined) {
              error.error = true;
              error.message = loginErrorMessage.email;
            }
            break;
          case 'password':
            if (!value || loginErrorMessage.path[0] == 'password') {
              error.error = true;
              error.message = loginErrorMessage.message;
            }
        }
      }
      setFormErrors(copyFormErrors);
    }
  }, [isLoginFailure]);

  useEffect(() => {
    if (isLoginSuccess) {
      window.location.replace('/dashboard');
    }

    console.log('successMessage', successMessage);
  }, [isLoginSuccess]);

  const handleInputChange = (value, field) => {
    createData.current[field] = value;
  };

  const validateInput = (value, field) => {
    const error = _.cloneDeep(formErrors[field]);
    loginValidate(value, field, error);
    setFormErrors((prevState) => ({ ...prevState, [field]: error }));
  };

  const handleSubmit = () => {
    setIsShowErrorMessage(true);
    if (!Object.values(formErrors).some((item) => item.error)) {
      const payload = { ...createData.current };
      dispatch(loginRequest(payload));
    }
  };

  return (
    <div className="login">
      <div className="login-content">
        <h1>SIGN IN</h1>
        <Row form>
          <Col md={12}>
            {loginInputField.map(({ field, placeholder, name, type }) => (
              <FormGroup key={field}>
                <Input
                  onChange={(e) => handleInputChange(e.target.value, field)}
                  onBlur={(e) => validateInput(e.target.value, field)}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  invalid={isShowErrorMessage && formErrors[field].error}
                  valid={successMessage.message}
                />
                <FormFeedback>{formErrors[field].message}</FormFeedback>
                <FormFeedback valid>{successMessage.message}</FormFeedback>
              </FormGroup>
            ))}
            <Button
              className="login-button"
              onClick={() => handleSubmit()}
              outline
            >
              SEND
              <Spinner
                style={{ width: '0.7rem', height: '0.7rem' }}
                type="grow"
                color="light"
              />
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
