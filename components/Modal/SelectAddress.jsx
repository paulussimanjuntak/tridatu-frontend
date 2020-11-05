import { Button, Modal } from "antd";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";

const SelectAddressModal = ({ show, submit, close, showAddAddress }) => {

  const onShowAddAddressHandler = () => {
    close()
    showAddAddress()
  }

  return (
    <>
      <Modal
        centered
        title={
          <div className="text-center">
            <span className="ant-modal-title">Pilih Alamat Pengiriman</span>
          </div>
        }
        visible={show}
        zIndex="1030"
        closeIcon={<i className="fas fa-times" />}
        onCancel={close}
        footer={false}
        className="modal-rad-10"
        width={700}
        bodyStyle={{
          padding: "10px 20px 20px 20px",
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        <Button type="dashed" block style={{ height: 45 }} className="text-secondary" onClick={onShowAddAddressHandler}>
          Tambah Alamat Baru
        </Button>

        {[...Array(5)].map((_, i) => (
          <Card className="card-address" key={i}>
            <Media>
              <Media.Body>
                <Card.Body>
                  <p className="user-address-title mb-0 fw-500">
                    Andi salamen <span className="font-weight-light">(Rumah)</span>
                  </p>
                  <p className="font-weight-light user-phone mb-0">628515678910</p>
                  <p className="text-secondary mb-0">
                    Jl. Kenari Raya, Kec. Kuta Sel., Kabupaten Badung, Bali, 80361
                    [Tokopedia Note: JALAN TAMAN GIRIYA PERUMAHAN BINA SATYA PERMAI
                    GANG MAWAR-Y NOMOR 41] Kuta Selatan, Kab. Badung, 80361
                  </p>
                </Card.Body>
              </Media.Body>
              <Button className="align-self-center btn-tridatu m-r-20" onClick={submit}>
                Pilih Alamat
              </Button>
            </Media>
          </Card>
        ))}
      </Modal>

      <style jsx>{`
        :global(.card-address){
          border-radius: 5px;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
};

export default SelectAddressModal;
