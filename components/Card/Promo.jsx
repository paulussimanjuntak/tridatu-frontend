import Card from "react-bootstrap/Card";
import { Typography } from 'antd';

const Paragraph = Typography.Paragraph ;

const CardPromo = ({ image }) => {
  return(
    <>
      <Card className="mb-4 border-0 shadow">
        <div className="promotion-image">
          <Card.Img
            variant="top"
            src={image}
            alt="Tridatu Bali"
            height="10"
            className="img-fit img-fluid"
          />
        </div>
        <Card.Body className="p-3">
          <Card.Text className="text-dark truncate-2 fs-14-s">
            <a href="#" className="text-reset">
              Belanja Gadget dan Electronic Ter-update Diskon Rp 200ribu dengan Kartu Kredit
            </a>
          </Card.Text>
          <div className="promotion-date">
            <div className="promotion-date-detail">
              <div className="promotion-box-label">Periode Promo</div>
              <div className="promotion-box__value">10 Sep - 29 Okt 2020</div>
            </div>
          </div>
          <div className="promotion-code">
            <div className="promotion-code-detail">
              <div className="promotion-box-label">Kode Promo</div>
              <div className="promotion-box__value">
                <Paragraph copyable className="copy-code">
                  HAHAHAFREE
                </Paragraph>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <style jsx>{`
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

export default CardPromo
