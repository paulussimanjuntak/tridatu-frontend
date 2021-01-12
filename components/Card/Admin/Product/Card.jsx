import { Card as CardAnt, Dropdown, Menu } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons'

import Image from "next/image";
import Card from 'react-bootstrap/Card'
import Button from "antd-button-color"

import formatNumber from 'lib/formatNumber'

const CardProductAdmin = ({ data, aliveArchive }) => {
  const { products_id, products_name, products_slug, products_image_product, products_live, variants_price } = data;
        
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
            <EditOutlined key="edit" />,
            <Dropdown 
              placement="bottomRight" 
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item onClick={() => aliveArchive(products_id)}>
                    {products_live ? "Arisipkan" : "Tampilkan" }
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
                src={`${process.env.NEXT_PUBLIC_API_URL}/static/products/${products_slug}/${products_image_product[0]}`}
                alt="Tridatu Bali"
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
            <p className="mb-0 text-tridatu text-truncate">Rp.{formatNumber(variants_price)}</p>
            {/* <p className="mb-1 text-muted text-truncate"> */}
            {/*   Stok <span className="text-dark text-truncate">30</span> */}
            {/* </p> */}
          </Card.Body>
        </CardAnt>
      </motion.div>

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
