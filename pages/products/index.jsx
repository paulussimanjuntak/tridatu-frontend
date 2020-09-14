import { useState } from 'react';
import { Menu, Rate, Tag, InputNumber, Radio, Checkbox, Drawer } from 'antd';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ButtonBoot from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import CardProduct from "components/Card/Product";

const CardProductMemo = React.memo(CardProduct);

import ProductsStyle, { radioStyle } from "components/Products/style";

const renderTitle = (title) => <b className="text-dark">{title}</b> 
const renderSubTitle = (title) => <span className="text-muted">{title}</span>

const listFilter = ['Kemeja', 'Batik', 'Kaos', 'Jaket', 'Jeans', 'Celana', 'Ikat Pinggang', 'Tas Selempang', 'Kemeja', 'Batik', 'Kaos', 'Jaket', 'Jeans', 'Celana', 'Ikat Pinggang', 'Tas Selempang'];

const ProductContainer = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return(
    <>
      <Container className="pt-4 pb-2">
        <Row>
          <Col>
            <span className="text-secondary">Hasil pencarian dari "Baju"</span>
          </Col>
        </Row>
      </Container>
      <hr />
      <Container className="pb-3 pt-3">
        <Row>
          <Col className="col-3 d-none d-lg-block">
            <h6>Filter</h6>
            <Card className="border-0 shadow-filter">
              <Menu
                className="filter-menu noselect"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1', 'sub6', 'sub7']}
                mode="inline"
              >
                <Menu.SubMenu key="sub1" title={renderTitle('Kategori')}>
                  <Menu.SubMenu key="sub2" title={renderSubTitle('Baju')}>
                    <Menu.Item key="7" className="text-secondary">Kaos</Menu.Item>
                    <Menu.Item key="8" className="text-secondary">Kemeja</Menu.Item>
                  </Menu.SubMenu>
                  <Menu.SubMenu key="sub4" title={renderSubTitle('Ikat Pinggang')}>
                    <Menu.Item key="5" className="text-secondary">Kulit</Menu.Item>
                    <Menu.Item key="6" className="text-secondary">Kanvas</Menu.Item>
                  </Menu.SubMenu>
                  <Menu.SubMenu key="sub5" title={renderSubTitle('Celana')}>
                    <Menu.Item key="12" className="text-secondary">Kain</Menu.Item>
                    <Menu.Item key="9" className="text-secondary">Jeans</Menu.Item>
                    <Menu.Item key="10" className="text-secondary">Panjang</Menu.Item>
                    <Menu.Item key="11" className="text-secondary">Pendek</Menu.Item>
                  </Menu.SubMenu>
                  <Menu.SubMenu key="sub8" title={renderSubTitle('Jaket')}>
                    <Menu.Item key="121" className="text-secondary">Kain</Menu.Item>
                    <Menu.Item key="91" className="text-secondary">Jeans</Menu.Item>
                    <Menu.Item key="101" className="text-secondary">Kulit</Menu.Item>
                  </Menu.SubMenu>
                  <Menu.SubMenu key="sub9" title={renderSubTitle('Tas Selempang')}>
                    <Menu.Item key="122" className="text-secondary">Kain</Menu.Item>
                    <Menu.Item key="102" className="text-secondary">Kulit</Menu.Item>
                  </Menu.SubMenu>
                </Menu.SubMenu>

                <Menu.SubMenu key="sub7" className="filter-checkbox" title={renderTitle('Rating')}>
                  {/*
                  <Menu.Item className="checkbox-item">
                    <Checkbox name="_4keatas" checked={rating._4keatas} onChange={ratingHandler}>
                      <Rate disabled defaultValue={1} count={1} className="filter-rate" />
                      <span className="text-secondary">4 Keatas</span>
                    </Checkbox>
                    <br />
                    <Checkbox name="_3keatas" checked={rating._3keatas} onChange={ratingHandler}>
                      <Rate disabled defaultValue={1} count={1} className="filter-rate" />
                      <span className="text-secondary">3 Keatas</span>
                    </Checkbox>
                  </Menu.Item>
                  */}
                  <Menu.Item className="checkbox-item">
                    <Radio.Group onChange={e => console.log(e.target.value)}>
                      <Radio style={radioStyle} value={1}>
                        <Rate disabled defaultValue={1} count={1} className="filter-rate" />
                        <span className="text-secondary">4 Keatas</span>
                      </Radio>
                      <Radio style={radioStyle} value={2}>
                        <Rate disabled defaultValue={1} count={1} className="filter-rate" />
                        <span className="text-secondary">3 Keatas</span>
                      </Radio>
                    </Radio.Group>
                  </Menu.Item>
                </Menu.SubMenu>

                <Menu.SubMenu key="sub6" title={renderTitle('Harga')}>
                  <div className="p-l-20 p-r-20 mt-3">
                    <Form.Group>
                      <Form.Label className="text-secondary m-b-13">Harga Minimum</Form.Label>
                      <InputNumber formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        parser={value => value.replace(/\Rp\s?|(\.*)/g, "")}
                        className={`w-100`}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label className="text-secondary m-b-13">Harga Maksimum</Form.Label>
                      <InputNumber formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        parser={value => value.replace(/\Rp\s?|(\.*)/g, "")}
                        className={`w-100`}
                      />
                    </Form.Group>
                  </div>
                  <Menu.Item className="checkbox-item">
                    <Checkbox>
                      <span className="text-secondary">Diskon</span>
                    </Checkbox>
                  </Menu.Item>
                </Menu.SubMenu>

              </Menu>
            </Card>
          </Col> 

          <Col className="">
            <h4 className="mb-2 d-none d-lg-block">Produk</h4>
            <div className="mb-3 d-none d-lg-block">
              <span className="text-secondary font-weight-light">Filter aktif: </span>
              {listFilter.map((data, i) => (
                <Tag key={i} 
                  closable 
                  className="filter-tag"
                  closeIcon={<i className="fas fa-times" />}
                >
                  {data}
                </Tag>
              ))}
              <a href="#" className="text-tridatu fs-14">Hapus Semua</a>
            </div>

            <Row className="row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4">
              {[...Array(10)].map((_, i) => (
                <Col key={i}>
                  <CardProductMemo />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row className="fixed-bottom text-center mb-3 d-lg-none">
          <Col>
            <ButtonBoot variant="dark" className="badge-pill px-3 py-2 fs-14 shadow" onClick={showDrawer}>
              <i className="far fa-filter mr-2" />Filter
            </ButtonBoot>
          </Col>
        </Row>
      </Container>

       <Drawer
        placement="bottom"
        title="Filter"
        closeIcon={<i className="fas fa-times" />}
        onClose={onClose}
        visible={visible}
        bodyStyle={{padding: 0, backgroundColor:'#f5f5f5'}}
        className="d-block d-sm-block d-md-block d-lg-none d-xl-none"
        height="100vh"
        zIndex="1030"
      >
         <Row className="mb-2 mt-1">
           <Col>
             <Card className="border-0 radius-0">
               <Card.Body>
                 <Card.Title>Harga</Card.Title>
               </Card.Body>
             </Card>
           </Col>
         </Row>
         <Row>
           <Col>
             <Card className="border-0 radius-0">
               <Card.Body>
                 <Card.Title>Harga</Card.Title>
               </Card.Body>
             </Card>
           </Col>
         </Row>
      </Drawer>

      <style jsx>{ProductsStyle}</style>
      <style jsx>{`
        :global(.filter-tag){
          margin-right: 7px;
          margin-bottom: 7px;
          padding: 4px 10px;
          background: transparent;
          border-radius: .25rem;
        }
      `}</style>
    </>
  )
}

export default ProductContainer
