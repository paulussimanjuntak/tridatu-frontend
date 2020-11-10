import { useState } from "react";
import { Modal, notification } from "antd";
import { AnimatePresence, motion } from "framer-motion";

import axios from "lib/axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { formEmail, formEmailIsValid } from "formdata/formEmail";

const RESET = 'reset', RESEND = 'resend'

const ExtraAuth = ({ show, handler, close, type }) => {
  const [loading, setLoading] = useState(false);
  const [extraAuth, setExtraAuth] = useState(formEmail);

  const { email } = extraAuth;

  const closeModalHandler = () => {
    close()
    setExtraAuth(formEmail)
  }

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const data = {
      ...extraAuth,
      [name]: {
        ...extraAuth[name],
        value: value, isValid: true, message: null,
      },
    };
    setExtraAuth(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formEmailIsValid(extraAuth, setExtraAuth)) {
      setLoading(true)
      const data = { email: email.value };

      let url = "/reset"
      if(type === RESEND) url = "/users/resend-email"

      axios.post(url, data)
        .then(res => {
          setLoading(false)
          notification.success({
            closeIcon: <i className="far fa-times" />,
            message: 'Success',
            description: res.data.detail,
            placement: 'bottomRight',
          });
          closeModalHandler()
        })
        .catch(err => {
          setLoading(false)
          const errDetail = err.response.data.detail
          if(typeof(errDetail) === "string"){
            const state = JSON.parse(JSON.stringify(extraAuth));
            state.email.value = state.email.value
            state.email.isValid = false
            state.email.message = errDetail
            setExtraAuth(state)
          } else {
            const state = JSON.parse(JSON.stringify(extraAuth));
            errDetail.map(data => {
              const key = data.loc[data.loc.length - 1]
              if(state[key]){
                state[key].value = state[key].value;
                state[key].isValid = false;
                state[key].message = data.msg;
              }
            })
            setExtraAuth(state)
          }
        })
    }
  };

  return (
    <>
      <Modal
        centered
        title=" "
        footer={null}
        visible={show}
        onOk={closeModalHandler}
        onCancel={closeModalHandler}
        className="modal-login"
        zIndex="1030"
        closeIcon={<i className="fas fa-times" />}
      >
        <h4 className="fs-20-s">
          {type === RESET && "Atur ulang kata sandi"}
          {type === RESEND && "Kirim ulang email verifikasi"}
        </h4>

        <p className="text-muted fs-12-s">
          Masukkan e-mail yang terdaftar. Kami akan mengirimkan
          {type === RESET && " link untuk atur ulang kata sandi."}
          {type === RESEND && " link verifikasi terbaru."}
        </p>

        <Form className="my-3 mb-3">
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

          <Button className="mt-4 btn-tridatu mb-0" block onClick={submitHandler}>
            Kirim
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

        <p className="text-muted mb-0 fs-12">
          Belum punya akun?
          <strong>
            <span className="text-tridatu hover-pointer noselect" onClick={handler}>
              {" "}
              Daftar
            </span>
          </strong>
        </p>

      </Modal>
    </>
  );
};

export default ExtraAuth;
