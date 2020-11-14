import { withAuth } from "lib/withAuth";
import { useState } from "react";
import { Button, Modal, notification } from "antd";
import { AnimatePresence, motion } from "framer-motion";

import axios, { jsonHeaderHandler } from "lib/axios";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import ErrorMessage from "components/ErrorMessage";

import { formConfigPassword, formVerifyPassword, formConfigPasswordIsValid, formVerifyPasswordIsValid } from "formdata/formConfigPassword";

const Password = () => {
  const isUpdate = true;
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formPassword, setFormPassword] = useState(formConfigPassword);
  const [verifyPassword, setVerifyPassword] = useState(formVerifyPassword);

  const { old_password, password, confirm_password } = formPassword;
  const { verify_password } = verifyPassword;

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const data = {
      ...formPassword,
      [name]: {
        ...formPassword[name],
        value: value,
        isValid: true,
        message: null,
      },
    };
    setFormPassword(data);
  };

  const verifyPasswordHandler = (e) => {
    const value = e.target.value;
    const data = {
      ...verifyPassword,
      verify_password: {
        ...verifyPassword.verify_password,
        value: value,
        isValid: true,
        message: null
      }
    }
    setVerifyPassword(data);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    // if (formConfigPasswordIsValid(formPassword, setFormPassword, isUpdate)) {
    if (true) {
      setLoading(true);
      let url = "/users/add-password";
      let method = "post";
      let data = {
        password: password.value,
        confirm_password: confirm_password.value,
      };

      if (isUpdate) {
        data = { ...data, old_password: old_password.value };
        url = "/users/update-password";
        method = "put";
      }

      axios[method](url, data, jsonHeaderHandler())
        .then((res) => {
          setLoading(false);
          setFormPassword(formConfigPassword)
          notification.success({
            closeIcon: <i className="far fa-times" />,
            message: "Success",
            description: res.data.detail,
            placement: "bottomRight",
          });
          console.log("success update password => ", res.data)
        })
        .catch((err) => {
          setLoading(false);
          const errDetail = err.response.data.detail;
          const freshRequired = "Fresh token required";
          if (typeof errDetail === "string" && errDetail === freshRequired) {
            console.log("err update password FRESS REQUIRED => ", err.response)
            setShowConfirmPassword(true);
          }
          else if (typeof errDetail === "string" && errDetail) {
            const state = JSON.parse(JSON.stringify(formPassword));
            if(isUpdate){
              state.old_password.value = state.password.value;
              state.old_password.isValid = false;
              state.old_password.message = errDetail;
              setFormPassword(state);
            } else {
              state.password.value = state.password.value;
              state.password.isValid = false;
              state.password.message = errDetail;
              setFormPassword(state);
            }
          } else {
            const state = JSON.parse(JSON.stringify(formPassword));
            errDetail.map((data) => {
              const key = data.loc[data.loc.length - 1];
              if (state[key]) {
                state[key].value = state[key].value;
                state[key].isValid = false;
                state[key].message = data.msg;
              }
            });
            setFormPassword(state);
          }
        });
    }
  };

  const submitVerifyPassword = (e) => {
    e.preventDefault();
    if (formVerifyPasswordIsValid(verifyPassword, setVerifyPassword)){
      const data = {
        password: verify_password.value
      }
    }
  }

  return (
    <>
      <Card className="card-container">
        <Card.Header className="bg-transparent border-bottom">
          <h1 className="fs-16 mt-1 mb-0">Atur Password</h1>
          <small>
            Untuk keamanan akun Anda, mohon untuk tidak menyebarkan password
            Anda ke orang lain.
          </small>
        </Card.Header>
        <Card.Body>
          <Form>
            {isUpdate && (
              <Form.Row>
                <Form.Group as={Col} lg={8} md={8} sm={12}>
                  <Form.Label>Password Saat Ini</Form.Label>
                  <Form.Control
                    type="password"
                    name="old_password"
                    placeholder="Password saat ini"
                    value={old_password.value}
                    onChange={inputChangeHandler}
                  />
                  <ErrorMessage item={old_password} />
                </Form.Group>
              </Form.Row>
            )}

            <Form.Row>
              <Form.Group as={Col} lg={8} md={8} sm={12}>
                <Form.Label>Password Yang Baru</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password yang baru"
                  value={password.value}
                  onChange={inputChangeHandler}
                />
                <ErrorMessage item={password} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} lg={8} md={8} sm={12}>
                <Form.Label>Konfirmasi Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirm_password"
                  placeholder="Konfirmasi Password"
                  value={confirm_password.value}
                  onChange={inputChangeHandler}
                />
                <ErrorMessage item={confirm_password} />
              </Form.Group>
            </Form.Row>

            <Button className="btn-tridatu" onClick={submitHandler}>
              Simpan 
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="spinner-border spinner-border-sm ml-2"
                  />
                )}
              </AnimatePresence>
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Modal
        centered
        title=" "
        footer={null}
        visible={showConfirmPassword}
        maskClosable={false}
        onOk={() => setShowConfirmPassword(false)}
        onCancel={() => setShowConfirmPassword(false)}
        className="modal-login"
        zIndex="1030"
        width={400}
        closeIcon={<i className="fas fa-times" />}
        maskStyle={{backgroundColor: "#000000c7"}}
      >
        <h4 className="fs-20-s">
          Konfirmasi password
        </h4>
        <p className="text-muted fs-12-s">
          Masukkan password saat ini untuk mengkonfirmasi perubahan password anda.
        </p>

        <Form className="mt-3 mb-0">
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={verify_password.value}
              onChange={verifyPasswordHandler}
            />
            <ErrorMessage item={verify_password} />
          </Form.Group>

          <Button
            className="mt-1 btn-tridatu mb-0"
            block
            onClick={submitVerifyPassword}
          >
            Konfirmasi Password
          </Button>
        </Form>

      </Modal>
    </>
  );
};

export default withAuth(Password);
