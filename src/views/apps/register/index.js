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
import './register.scss';
import { registerRequest, userCheckRequest } from '../../../redux/auth/actions';
import { registerInputField } from '../../../utility/constants';
import { Validate } from './validate';

const Register = () => {
  const dispatch = useDispatch();

  const {
    isRegisterFailure,
    errorMessage,
    isCheckUserFailure,
    isCheckUserSuccess,
    emailErrorMessage,
  } = useSelector((store) => store.auth);

  const [formErrors, setFormErrors] = useState({
    firstName: { error: true, message: 'Last Name is required' },
    lastName: { error: true, message: 'First Name is required' },
    email: { error: true, message: 'Email is required' },
    password: { error: true, message: 'Password is required' },
    password_confirmation: {
      error: true,
      message: 'Confirm Password is required',
    },
    role: { error: true, message: 'User Type is required' },
  });
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);

  const [isShowEmailErrorMessage, setIsShowEmailErrorMessage] = useState(false);

  const createData = useRef({});

  const isMounted = useRef(false);

  useEffect(() => {
    console.log('Use Effect after data sending ', formErrors);
    if (errorMessage) {
      console.log('if (errorMessage) ', formErrors);
      const copyFormErrors = _.cloneDeep(formErrors);
      for (const [field, error] of Object.entries(copyFormErrors)) {
        const value = createData.current;
        switch (field) {
          case 'firstName':
            if (!value || errorMessage.path[0] === 'firstName') {
              error.error = true;
              error.message = errorMessage.message;
            }
            break;
          case 'lastName':
            if (!value || errorMessage.path[0] === 'lastName') {
              error.error = true;
              error.message = errorMessage.message;
            }
            break;
          case 'email':
            if (!value || errorMessage['email'] !== undefined) {
              error.error = true;
              error.message = errorMessage.email;
            }
            break;
          case 'password':
            if (!value || errorMessage.path[0] === 'password') {
              error.error = true;
              error.message = errorMessage.message;
            }
            break;
          case 'password_confirmation':
            if (!value || errorMessage.path[0] === 'password_confirmation') {
              error.error = true;
              error.message = errorMessage.message;
            }
        }
      }
      setFormErrors(copyFormErrors);
    }
  }, [isRegisterFailure]);

  useEffect(() => {
    if (isMounted.current) {
      const copyFormErrors = _.cloneDeep(formErrors);
      if (isCheckUserFailure) {
        copyFormErrors.email.error = true;
        copyFormErrors.email.message = emailErrorMessage;
        setIsShowEmailErrorMessage(true);
      } else {
        copyFormErrors.email.error = false;
        copyFormErrors.email.message = '';
      }
      setFormErrors(copyFormErrors);
    } else {
      isMounted.current = true;
    }
  }, [isCheckUserFailure, emailErrorMessage]);

  const handleInputChange = (value, field) => {
    createData.current[field] = value;
  };

  const validateInput = (value, field) => {
    const error = _.cloneDeep(formErrors[field]);
    const currentValues = createData;
    Validate(value, field, error, currentValues);
    if (value && field == 'email') {
      checkUser();
    }
    setFormErrors((prevState) => ({ ...prevState, [field]: error }));
  };

  const handleSubmit = () => {
    setIsShowErrorMessage(true);
    console.log('formErrors', formErrors);
    if (!Object.values(formErrors).some((item) => item.error)) {
      const payload = { ...createData.current };
      dispatch(registerRequest(payload));
    }
  };

  const checkUser = () => {
    const payload = createData.current.email;

    setTimeout(function () {
      dispatch(userCheckRequest(payload));
    }, 1000);
    console.log(
      'isCheckUserSuccess',
      isCheckUserFailure && isCheckUserFailure === true
    );
    console.log(
      'isCheckUserFailure',
      isCheckUserSuccess && isCheckUserSuccess === true
    );
  };

  return (
    <div className="register">
      <div className="register-content">
        <h1>SIGN UP</h1>
        <Row form>
          <Col md={12}>
            {registerInputField.map(({ field, placeholder, name, type }) => (
              <FormGroup key={field} style={{ position: 'relative' }}>
                <Input
                  onChange={(e) => handleInputChange(e.target.value, field)}
                  onBlur={(e) => validateInput(e.target.value, field)}
                  type={type}
                  name={field}
                  placeholder={placeholder}
                  invalid={
                    (isShowErrorMessage && formErrors[field].error) ||
                    (field === 'email' &&
                      formErrors[field].error &&
                      isShowEmailErrorMessage)
                  }
                />
                {field === 'email' &&
                createData.current.email !== undefined &&
                isCheckUserSuccess === false &&
                isCheckUserFailure === false ? (
                  <Spinner
                    style={{
                      position: 'absolute',
                      right: '15px',
                      top: '12px',
                      width: '1rem',
                      height: '1rem',
                    }}
                  >
                    Loading...
                  </Spinner>
                ) : (
                  ''
                )}
                <FormFeedback>{formErrors[field].message}</FormFeedback>
              </FormGroup>
            ))}

            <FormGroup key="role">
              <Input
                onChange={(e) => handleInputChange(e.target.value, 'role')}
                onBlur={(e) => validateInput(e.target.value, 'role')}
                id="user-type-select"
                name="role"
                type="select"
                placeholder="Choose User Type"
                invalid={isShowErrorMessage && formErrors['role'].error}
              >
                <option></option>
                <option>seller</option>
                <option>buyer</option>
              </Input>
              <FormFeedback>{formErrors['role'].message}</FormFeedback>
            </FormGroup>
            <Button
              className="register-button"
              onClick={() => handleSubmit()}
              outline
            >
              SEND
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Register;
