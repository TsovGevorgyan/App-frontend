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
import { Validate } from './validate';

const Login = () => {
  const dispatch = useDispatch();

  const { isLoginFailure, loginErrorMessage, isLoginSuccess } = useSelector(
    (store) => store.auth
  );

  const [formErrors, setFormErrors] = useState({
    email: { error: true, message: 'Email is required' },
    password: { error: true, message: 'Password is required' },
  });

  const [loginFeedback, setLoginFeedback] = useState({
    loginFeedbackMessage: '',
  });

  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);

  const createData = useRef({});

  useEffect(() => {
    const copyLoginFeedback = _.cloneDeep(loginFeedback);
    if (isLoginFailure) {
      copyLoginFeedback.loginFeedbackMessage = loginErrorMessage;
      setLoginFeedback(copyLoginFeedback);
    }
  }, [isLoginFailure]);

  useEffect(() => {
    if (isLoginSuccess) {
      window.location.replace('/dashboard');
    }
  }, [isLoginSuccess]);

  const handleInputChange = (value, field) => {
    createData.current[field] = value;
  };

  const validateInput = (value, field) => {
    const error = _.cloneDeep(formErrors[field]);
    Validate(value, field, error);
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
                />
                <FormFeedback>{formErrors[field].message}</FormFeedback>
              </FormGroup>
            ))}
            {loginFeedback.loginFeedbackMessage != '' ? (
              <p style={{ color: 'red' }}>
                {loginFeedback.loginFeedbackMessage}
              </p>
            ) : (
              ''
            )}
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
