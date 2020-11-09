import { useState } from "react";
import { Modal, Divider } from "antd";
import axios from "lib/axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import SocialLogin from "./SocialLogin";

import { formLogin, formLoginIsValid } from "formdata/formLogin";

const Login = ({ show, handler, close }) => {
  const [login, setLogin] = useState(formLogin);

  const { email, password } = login;

  const loginHandler = () => {
    close();
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const data = {
      ...login,
      [name]: {
        ...login[name],
        value: value,
        isValid: true,
        message: null,
      },
    };

    setLogin(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formLoginIsValid(login, setLogin)) {
      const data = {
        email: email.value,
        password: password.value,
      };

      axios.post("/users/login", data)
        .then(res => {
          console.log(res)
          loginHandler()
        })
        .catch(err => err.response)
    }
  };

  return (
    <>
      <Modal
        centered
        title=" "
        footer={null}
        visible={show}
        onOk={close}
        onCancel={close}
        className="modal-login"
        zIndex="1030"
        closeIcon={<i className="fas fa-times" />}
      >
        <h4 className="fs-20-s">
          Masuk
          <a
            href="#"
            className="fs-12 float-right text-secondary pt-2"
            onClick={handler}
          >
            Daftar
          </a>
        </h4>

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
          </Form.Group>

          <Button className="mt-4 btn-tridatu" block onClick={submitHandler}>
            Masuk
          </Button>
        </Form>

        <Divider className="mb-4" plain>
          <span className="text-muted">atau masuk dengan</span>
        </Divider>

        <SocialLogin text="Masuk" />
      </Modal>
    </>
  );
};

export default Login;
