import { useState } from 'react'
import { Card as CardAnt, Dropdown, Menu, Modal, Space } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons'

import Link from "next/link";
import Image from "next/image";
import Card from 'react-bootstrap/Card'
import Button from "antd-button-color"

import formatNumber from 'lib/formatNumber'

const CardProductAdmin = ({ data, aliveArchive, deleteProduct }) => {
  const { products_id, products_name, products_slug, products_image_product, products_live, variants_price } = data;

  const [showModal, setShowModal] = useState(false)

  const onDeleteProduct = () => {
    deleteProduct(products_id)
    setShowModal(false)
  }
  return(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: ".2" }}
      >
        <CardAnt
          className="product-card-admin"
          bodyStyle={{ padding: 0 }}
          actions={[
            <Link href="products/[slug]" as={`products/${products_slug}`}>
              <a className="text-decoration-none">
                <EditOutlined key="edit" />
              </a>
            </Link>,
            <Dropdown 
              placement="bottomRight" 
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item onClick={() => aliveArchive(products_id)}>
                    {products_live ? "Arisipkan" : "Tampilkan" }
                  </Menu.Item>
                  <Menu.Item onClick={() => setShowModal(true)} className="text-danger">
                    Hapus
                  </Menu.Item>
                </Menu>
              } 
            >
              <EllipsisOutlined key="more" />
            </Dropdown>
          ]}
        >
          <div className="position-relative">
            <div className="text-center">
              <Image 
                width={270}
                height={270}
                src={`${process.env.NEXT_PUBLIC_API_URL}/static/products/${products_slug}/${products_image_product}`}
                alt="Tridatu Bali"
                onClick={() => setShowModal(true)}
              />
            </div>
            <AnimatePresence>
              {!products_live && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: ".2" }}
                  className="w-100"
                >
                  <div className="item-overlay text-center text-white">
                    <h4 className="mb-2">
                      <i className="fas fa-lock-alt text-white" />
                    </h4>
                    <p className="fs-12 mb-2">Diarsipkan</p>
                    <Button ghost className="btn-product-overlay fs-12" onClick={() => aliveArchive(products_id)}>Tampilkan</Button>
                  </div>
                  <div className="image-overlay"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Card.Body className="fs-13 fs-14-m py-1 px-2">
            <div style={{ height: "44px" }}>
              <p className="mb-0 font-weight-light text-break truncate-2">
                {products_name}
              </p>
            </div>
            <div className="d-flex justify-content-between noselect">
              <span className="mb-0 text-tridatu text-truncate">Rp.{formatNumber(variants_price)}</span>
              <span className="mb-0 text-muted text-truncate">Stok <span className="text-dark">30</span></span>
            </div>
            <div className="d-flex justify-content-between text-black-50 fs-12 noselect">
              <span className="mb-0 text-truncate"><i className="fal fa-eye" />100</span>
              <span className="mb-0 text-truncate mx-1"><i className="fal fa-heart" /> 30</span>
              <span className="mb-0 text-truncate">Penjualan 1K</span>
            </div>
          </Card.Body>
        </CardAnt>
      </motion.div>

      <Modal
        centered
        visible={showModal}
        zIndex={3000}
        width={416}
        closable={false}
        footer={null}
        className="modal-rad-10 text-center"
      >
        <div className="text-dark">
          <h5 className="mb-3">Hapus produk?</h5>
          <p className="text-black-50 fs-14">{products_name}</p>
          <p className="text-black-50">Penghapusan produk tidak dapat dibatalkan</p>

          <Space>
            <Button onClick={() => setShowModal(false)}>Batal</Button>
            <Button type="primary" className="btn-tridatu" onClick={onDeleteProduct}>Hapus</Button>
          </Space>
        </div>
      </Modal>

      <style jsx>{`
        :global(.product-card-admin .ant-card-actions > li){
          margin: 5px 0;
        }
        .image-overlay {
          position: absolute;
          top: 0;
          bottom: 6px;
          left: 0;
          right: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.6);
        }
        .item-overlay{
          position: absolute;
          z-index: 20;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
        }
        :global(.btn-product-overlay){
          color: white !important;
          border-color: #e5e5e5 !important;
          padding: 0px 10px;
        }
        :global(.btn-product-overlay:hover, .btn-product-overlay:focus, .btn-product-overlay:active){
          color: white !important;
          border-color: #e5e5e5 !important;
          background-color: rgba(255,255,255,.1) !important;
        }

      `}</style>
    </>
  )
}

export default CardProductAdmin
