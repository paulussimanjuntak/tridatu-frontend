import { Menu, Checkbox, Rate, Slider, Tag } from 'antd';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import CardProduct from "components/Card/Product";

const CardProductMemo = React.memo(CardProduct);

import ProductsStyle from "components/Products/style";

const renderTitle = (title) => <b className="text-dark">{title}</b> 
const renderSubTitle = (title) => <span className="text-muted">{title}</span>

const listFilter = ['Kemeja', 'Batik', 'Kaos', 'Jaket', 'Jeans', 'Celana', 'Ikat Pinggang', 'Tas Selempang', 'Kemeja', 'Batik', 'Kaos', 'Jaket', 'Jeans', 'Celana', 'Ikat Pinggang', 'Tas Selempang'];

const ProductContainer = () => {
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
          <Col className="col-3">
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
                  <Menu.Item className="checkbox-item" disabled>
                    <Checkbox>
                      <Rate disabled defaultValue={1} count={1} className="filter-rate" />
                      <span className="text-secondary">4 Keatas</span>
                    </Checkbox>
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="sub6" title={renderTitle('Harga (IDR)')}>
                  <div className="p-l-20 p-r-20">
                    <Table className="table-borderless mb-4">
                      <thead>
                        <tr className="mb-2">
                          <td className="fs-12 text-secondary pl-0 pb-3">Min</td>
                          <td className="fs-12 text-secondary text-right pr-0 pb-3">Max</td>
                        </tr>
                        <tr>
                          <td className="pl-0 py-0">
                            <p className="font-weight-bold text-dark card-text">
                              10.000
                            </p>
                          </td>
                          <td className="pr-0 py-0">
                            <p className="font-weight-bold text-dark card-text float-right">
                              500.000
                            </p>
                          </td>
                        </tr>
                      </thead>
                    </Table>

                    <Slider 
                      range 
                      className="mb-3"
                      defaultValue={[0, 50]}
                      tooltipVisible={false}
                    />
                  </div>
                </Menu.SubMenu>
              </Menu>
            </Card>
          </Col> 

          <Col>
            <h4 className="mb-2">Produk</h4>
            <div className="mb-3">
              <span className="text-secondary font-weight-light">Filter aktif : </span>
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
      </Container>

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
