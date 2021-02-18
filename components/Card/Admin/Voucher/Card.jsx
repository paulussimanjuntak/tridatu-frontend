import { useRouter } from 'next/router';
import { Card as CardAnt, Typography, Space, Button, Popconfirm, Collapse } from 'antd';
import { QuestionCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import Link from 'next/link';
import Image from 'next/image';
import Card from "react-bootstrap/Card";

const Paragraph = Typography.Paragraph ;

const AdminCardVoucher = ({ image, idx }) => {

  return(
    <>
      <CardAnt 
        className="shadow-sm"
        bodyStyle={{ padding: 0 }}
        actions={[
          <a className="text-decoration-none">
            <EditOutlined key="edit" />
          </a>,
           <Popconfirm 
            title="Hapus promo ini?"
             onConfirm={() => {}}
            okText="Ya"
            cancelText="Batal"
            placement="bottom"
            arrowPointAtCenter
          >
            <DeleteOutlined key="delete" />
          </Popconfirm>
        ]}
      >
        <Image 
          width={600}
          height={328}
          src={image}
          alt="Tridatu Bali"
          className="img-fit radius-top-img-card"
        />
        <Card.Body className="p-3">
          <Card.Text className="text-dark truncate-2 fs-14-s">
            <Link href="/promo/belanja-diskon-serbu" as="/promo/belanja-diskon-serbu">
              <a className="text-reset">
                Belanja Gadget dan Electronic Ter-update Diskon Rp 200ribu dengan Kartu Kredit Belanja Gadget dan Electronic Ter-update Diskon Rp 200ribu dengan Kartu Kredit
              </a>
            </Link>
          </Card.Text>
          <div className="promotion-date">
            <div className="promotion-date-detail">
              <div className="promotion-box-label">Periode Promo</div>
              <div className="promotion-box__value">10 Sep - 29 Okt 2020</div>
            </div>
          </div>

          <Collapse collapsible="disabled" className="collapse-no-code">
            <Collapse.Panel showArrow={false} header="Tanpa Kode Promo">
            </Collapse.Panel>
          </Collapse>

        </Card.Body>

      </CardAnt>

      <style jsx>{`
        :global(.ant-collapse.collapse-no-code .ant-collapse-item-disabled > .ant-collapse-header, 
                .ant-collapse.collapse-no-code .ant-collapse-item-disabled > .ant-collapse-header > .arrow){
          color: unset;
          cursor: auto;
        }
        :global(.copy-code){
          color: #d63031;
        }
        :global(.copy-code > .ant-typography-copy){
          vertical-align: text-bottom;
        }
        .promotion-date .promotion-box-label{
          font-size: 12px;
          line-height: 16px;
          color: rgba(0,0,0,.6);
        }
        .promotion-date .promotion-box__value{
          font-size: 14px;
          color: rgba(0,0,0,.87);
          margin-bottom: 16px;
        }

        .promotion-code .promotion-box-label{
          font-size: 12px;
          line-height: 16px;
          color: rgba(0,0,0,.6);
        }
        .promotion-code .promotion-box__value{
          font-size: 14px;
          font-weight: 600;
        }

        @media(max-width:767px){
          .promotion-image {
            height:auto;
          }
        }
        @media(min-width: 992px) {
          .promotion-image {
            height: 154px;
          }
        }
        @media(min-width: 1200px) {
          .promotion-image {
            height: 189px;
          }
        }
      `}</style>
    </>
  )
}

export default AdminCardVoucher
