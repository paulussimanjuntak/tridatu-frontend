import { Collapse, Typography } from 'antd';

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import CardPromo from "components/Card/Promo";

const CardPromoMemo = React.memo(CardPromo);

let promos = ['https://ecs7.tokopedia.net/img/blog/promo/2020/09/Thumbnail-6.jpg', 'https://ecs7.tokopedia.net/img/blog/promo/2020/07/Thumbnail-Interior.png', 'https://ecs7.tokopedia.net/img/blog/promo/2019/09/ZHIYUN-THUMBNAIL.jpg']

const text = () => (
  <div className="promo-detail-info">
    <ol>
      <li>
        Periode program pengajuan KPR UOB hingga tanggal{" "}
        <span>
          30 November 2020 dengan batas pencairan kredit sampai 31 Desember 2020.
        </span>
      </li>
      <li>
        Setiap nasabah yang melakukan&nbsp;pengajuan&nbsp;dan
        pencairan&nbsp;KPR&nbsp;UOB&nbsp;melalui&nbsp;
        <a href="https://pib.uob.co.id/appforms/applynow/kpr.page?utm_medium=affiliate&utm_source=site&utm_campaign=bukalapakaff&utm_term=product&s_cid=pfs:id:paid:aff:site:bukalpk:bn:display:private-home-loan:na:bukalapakaff:product:na&vid=n">
          link berikut
        </a>
        &nbsp;akan mendapatkan&nbsp;&nbsp;E-voucher Bukalapak dan berkesempatan
        mengikuti Program Kejutan Simpanan.
      </li>
      <li>
        Nominal&nbsp;<em>E-voucher Bukalapak&nbsp;</em>yang akan diberikan
        berdasarkan nilai plafon yang dicairkan, dengan ketentuan sebagai berikut:{" "}
      </li>
      <li className="ql-indent-1">
        Plafond Rp150.juta&nbsp;– &lt; Rp300 juta mendapatkan e-voucher senilai
        Rp500 ribu.
      </li>
      <li className="ql-indent-1">
        Plafond Rp300 juta&nbsp;– &lt; Rp600 juta&nbsp;mendapatkan e-voucher
        senilai Rp1.125 juta.
      </li>
      <li className="ql-indent-1">
        Plafond Rp600 juta&nbsp;– &lt; Rp900 juta mendapatkan e-voucher senilai
        Rp1.875 juta.
      </li>
      <li className="ql-indent-1">
        Plafond Rp900 juta&nbsp;– &lt; Rp1.2&nbsp;milyar mendapatkan e-voucher
        senilai Rp2.625 juta.
      </li>
      <li className="ql-indent-1">
        Plafond Rp1.2&nbsp;milyar&nbsp;– &lt; Rp1.5 milyar mendapatkan e-voucher
        senilai Rp3.375 juta.
      </li>
      <li className="ql-indent-1">
        Plafond Rp1.5 milyar&nbsp;– &lt; Rp1.8&nbsp;milyar mendapatkan e-voucher
        senilai Rp4.125&nbsp;juta.
      </li>
      <li>
        Program ini tidak dapat digabung dengan program lainnya dan tidak berlaku
        untuk&nbsp;pengajuan&nbsp;melalui pihak ketiga lainnya seperti&nbsp;
        <strong>
          <em>Broker dan Developer</em>
        </strong>
        . Jika nasabah telah mengajukan&nbsp;KPR&nbsp;UOB&nbsp;melalui pihak
        ketiga, maka nasabah tidak&nbsp;<em>eligible</em>&nbsp;untuk
        mendapatkan&nbsp;<em>E-voucher Bukalapak.</em>
      </li>
      <li>
        Program ini hanya berlaku untuk jaminan yang terletak di Jabodetabek, Kota
        Batam, Medan, Bandung, Semarang, Yogyakarta, Surabaya, Makassar, dan Pulau
        Bali.
      </li>
      <li>
        Bank&nbsp;UOB&nbsp;Indonesia berhak menentukan siapa nasabah yang berhak
        mendapatkan hadiah dimana keputusan tersebut tidak dapat diganggu gugat.
      </li>
    </ol>
    <p />
  </div>
);

const PromoDetail = () => {

  const callback = (key) => {
    console.log(key);
  }

  return(
    <>
      <Container className="mb-5 pt-md-4 p-t-0-s p-l-0-s p-r-0-s">
        <Card className="border-0 shadow">
          <Card.Img variant="top" src="https://s1.bukalapak.com/promo/promo_partnerinfo_bloggy/original/3XE6rodxHGkoB3Sev2zijM-wBloggy_1.jpg" />
          <Card.Body>
            <div className="news-information font-weight-light fs-14 mb-2">
              <span className="mr-1">
                10 September 2020
              </span> 
              {" "}&#8226;{" "}
              <span className="share-news ml-1">
                <a className="text-reset"><i className="fal fa-share-square" /><span className="ml-1">Share</span></a>
              </span>
            </div>
            <h3 className="fs-18-s">Belanja Gadget dan Electronic Ter-update Diskon Rp 200ribu dengan Kartu Kredit</h3>
            <Card.Text className="fs-14-s">
              Promo elektronik rumah pintar cashback hingga 200 ribu di Tokopedia, 
              yuk cek promonya sekarang hanya di Tokopedia!
            </Card.Text>

            <Card className="border-0">
              <Card.Body className="p-0 fs-12-s">
                <Table responsive>
                  <tbody>
                    <tr>
                      <th>Minimum Pembayaran</th>
                      <td>Rp. 200.000</td>
                    </tr>
                    <tr>
                      <th>Kode Promo</th>
                      <td>
                        <Typography.Paragraph copyable className="copy-code">
                          BRINUF4BRINUF4
                        </Typography.Paragraph>
                      </td>
                    </tr>
                    <tr>
                      <th>Periode Promo</th>
                      <td>10 Sep - 29 Okt 2020</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            <Collapse defaultActiveKey={['1']} onChange={callback}>
              <Collapse.Panel header={<b>Syarat dan Ketentuan</b>} key="1">
                {text()}
              </Collapse.Panel>
            </Collapse>
            
          </Card.Body>
        </Card>

      </Container>

      <Container>
        <section>
          <h4 className="text-center text-dark mb-4">Promo Lainnya</h4>
          <Row>
            {promos.reverse().map((data, i) => (
              <Col md={4} sm={6} key={i}>
                <CardPromoMemo image={data} />
              </Col>
            ))}
          </Row>

          <div className="text-center mb-5 mt-3">
            <Button className="btn-dark-tridatu-outline mx-auto">Lihat Semua Promo</Button>
          </div>

        </section>
      </Container>

      <style jsx>{`
        :global(.copy-code){
          color: #d63031;
          margin-bottom: 0px !important;
        }
        :global(.copy-code > .ant-typography-copy){
          vertical-align: text-bottom;
        }
      `}</style>
    </>
  )
}

export default PromoDetail
