import { useState } from "react";
import { Divider, notification } from "antd";
import { AnimatePresence, motion } from "framer-motion";

import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { formReset, formResetIsValid } from "formdata/formResetPassword";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(formReset);

  const { email, password, confirm_password } = reset;

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const data = {
      ...reset,
      [name]: {
        ...reset[name],
        value: value, isValid: true, message: null,
      },
    };
    setReset(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if(formResetIsValid(reset, setReset)){
      setLoading(true);
      const data = {
        email: email.value,
        password: password.value,
        confirm_password: confirm_password.value
      }

      axios.post('/reset', data)
        .then(res => {
          setLoading(false)
          notification.success({
            closeIcon: <i className="far fa-tims" />,
            message: 'Success',
            description: res.data.detail,
            placement: 'bottomRight',
          });
        })
        .catch(err => {
          console.log(err.response)
          setLoading(false)
        })
    }
  };

  return (
    <>
      <Container className="py-3">
        <Row className="justify-content-center mt-3">
          <Col sm={12} md={8}>
            <h4>Reset Password</h4>
            <Divider />
            <Form className="my-4">

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email.value}
                  onChange={inputChangeHandler}
                />
                {!email.isValid && ( <small className="form-text text-left text-danger mb-n1">{email.message}</small>)}
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password.value}
                  onChange={inputChangeHandler}
                />
                {!password.isValid && ( <small className="form-text text-left text-danger mb-n1">{password.message}</small>)}
              </Form.Group>

              <Form.Group>
                <Form.Label>Confirmation Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirm_password"
                  placeholder="Confirmation Password"
                  value={confirm_password.value}
                  onChange={inputChangeHandler}
                />
                {!confirm_password.isValid && ( <small className="form-text text-left text-danger mb-n1">{confirm_password.message}</small>)}
              </Form.Group>

              <Button className="mt-4 btn-tridatu" block onClick={submitHandler}>
                Ubah Password
                <AnimatePresence>
                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="spinner-border spinner-border-sm ml-2" 
                    />
                  )}
                </AnimatePresence>
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPassword;
