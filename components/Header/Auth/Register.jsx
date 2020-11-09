import { useState } from "react";
import { Modal, Divider } from "antd";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import SocialLogin from "./SocialLogin";

import { formRegister, formRegisterIsValid } from "formdata/formRegister";

const Register = ({ show, handler, close, login }) => {
  const [register, setRegister] = useState(formRegister);

  const { username, email, password, confirm_password } = register;

  const loginHandler = () => {
    login();
    close();
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const data = {
      ...register,
      [name]: {
        ...register[name],
        value: value,
        isValid: true,
        message: null,
      },
    };

    setRegister(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if(formRegisterIsValid(register, setRegister)){
      const data = {
        username: username.value,
        email: email.value,
        password: password.value,
        confirm_password: confirm_password.value
      }

      console.log(data)
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
          Daftar
          <a
            href="#"
            className="fs-12 float-right text-secondary pt-2"
            onClick={handler}
          >
            Masuk
          </a>
        </h4>

        <Form className="my-4">
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={username.value}
              onChange={inputChangeHandler}
            />
            {!username.isValid && ( <small className="form-text text-left text-danger mb-n1">{username.message}</small>)}
          </Form.Group>

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

          <div className="mt-4 text-secondary">
            <span>Dengan mendaftar, saya menyetujui</span>
            <a className="text-tridatu"> Syarat dan Ketentuan</a>
            <span> dan </span>
            <a className="text-tridatu">Kebijakan Privasi</a>
          </div>

          <Button className="mt-2 btn-tridatu" block onClick={submitHandler}>
            Daftar
          </Button>
        </Form>

        <Divider className="mb-4" plain>
          <span className="text-muted">atau daftar dengan</span>
        </Divider>

        <SocialLogin text="Daftar" />
      </Modal>
    </>
  );
};

export default Register;
