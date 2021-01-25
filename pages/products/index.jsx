import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Rate, Tag, InputNumber, Checkbox, Drawer, Tabs, Select, Collapse, Col, Row, Empty } from 'antd';

import axios from 'lib/axios'
import RowB from "react-bootstrap/Row";
import ColB from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import ButtonBoot from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import isBoolean from 'validator/lib/isBoolean';
import isIn from 'validator/lib/isIn';

import CardProduct from "components/Card/Product";
import Pagination from "components/Pagination";
import formFilter from "formdata/formFilter";

import * as actions from "store/actions";

import ProductsStyle from "components/Products/style";

const CardProductMemo = React.memo(CardProduct);

const renderTitle = (title) => <b className="text-dark">{title}</b> 

const renderSubTitle = (title, item, type) => (
  <span 
    className="text-muted w-100 d-block bg-warning"
    onClick={e => {
      e.stopPropagation()
      console.log(JSON.stringify(item, null, 2))
    }}
  >
    {title}
  </span>
)

const sortList = [
  { value: "", label: "Paling Sesuai" }, 
  { value: "high_price", label: "Harga Tertinggi" }, 
  { value: "low_price", label: "Harga Terendah" }
] 
const ratingList = ['4 Ketas', '3 Keatas']

/*
 * TODO:
 * filter category - make like tokopedia
 */

const ProductContainer = ({ searchQuery }) => {
  const dispatch = useDispatch()
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState(formFilter);

  const [page, setPage] = useState(1)
  const [brandList, setBrandList] = useState([]);
  const [preorderList, setPreorderList] = useState([]);
  const [conditionList, setConditionList] = useState([]);
  const [wholesaleList, setWholesaleList] = useState([]);

  const allCategories = useSelector(state => state.categories.allCategories)
  const products = useSelector(state => state.products.products)
  const loadingProduct = useSelector(state => state.products.loading)
  const user = useSelector(state => state.auth.user)
  const brands = useSelector(state => state.brand.brand)

  const { order_by, category, rating, brand, p_min, p_max, pre_order, condition, wholesale } = activeFilter;

  const showDrawer = () => { setVisible(true); };
  const onClose = () => { setVisible(false); };

  const onSortChange = e => {
    const data = { ...activeFilter, order_by: {...order_by, value: [e]} }
    setActiveFilter(data)
  }
  const onSortMobileChange = e => {
    const data = { ...activeFilter, order_by: {...order_by, value: [e]} }
    setActiveFilter(data)
  }
  const onCategoryChange = (e, fn) => {
    const data = { ...activeFilter, category: {...category, value: [e.key]} }
    const emptydata = { ...activeFilter, category: {...category, value: []} }
    if(fn === "select") setActiveFilter(data)
    if(fn === "deselect") setActiveFilter(emptydata)
  }
  const onCategoryChangeMobile = e => {
    const data = { ...activeFilter, category: {...category, value: [e.slice(-1)[0]]} }
    const emptydata = { ...activeFilter, category: {...category, value: []} }
    if(e.slice(-1)[0] !== undefined) setActiveFilter(data)
    else setActiveFilter(emptydata)
  }

  const onRatingChange = e => {
    const data = { ...activeFilter, rating: {...rating, value: [e.slice(-1)[0]]} }
    const emptydata = { ...activeFilter, rating: {...rating, value: []} }
    if(e.slice(-1)[0] !== undefined) setActiveFilter(data)
    else setActiveFilter(emptydata)
  }

  const onPriceChange = (value, item) => {
    const data = { 
      ...activeFilter, 
      [item]: { ...[item], value: value } 
    }
    setActiveFilter(data)
  }
  const onConditionChange = (e, label) => {
    if(label){
      if(e.target.checked) setConditionList([e.target.label])
      else setConditionList([])
    } else {
      const data = { ...activeFilter, condition: { ...condition, value: [e.slice(-1)[0]] } }
      const emptydata = { ...activeFilter, condition: { ...condition, value: [] } }
      if(e.slice(-1)[0] !== undefined) setActiveFilter(data)
      else setActiveFilter(emptydata)
    }
  }
  const onBrandChange = (e, label) => {
    if(label){
      if(e.target.checked) setBrandList(brand => brand.concat(e.target.label))
      else setBrandList(brandList.filter(brand => brand !== e.target.label))
    }
    const data = { ...activeFilter, brand: {...brand, value: e} }
    setActiveFilter(data)
  }
  const onPreOrderChange = (e, label) => {
    if(label){
      if(e.target.checked) setPreorderList([e.target.label])
      else setPreorderList([])
    } else {
      const data = { ...activeFilter, pre_order: { ...pre_order, value: [e.slice(-1)[0]] } }
      const emptydata = { ...activeFilter, pre_order: { ...pre_order, value: [] } }
      if(e.slice(-1)[0] !== undefined) setActiveFilter(data)
      else setActiveFilter(emptydata)
    }
  }
  const onWholesaleChange = (e, label) => {
    if(label){
      if(e.target.checked) setWholesaleList([e.target.label])
      else setWholesaleList([])
    } else {
      const data = { ...activeFilter, wholesale: { ...wholesale, value: [e.slice(-1)[0]] } }
      const emptydata = { ...activeFilter, wholesale: { ...wholesale, value: [] } }
      if(e.slice(-1)[0] !== undefined) setActiveFilter(data)
      else setActiveFilter(emptydata)
    }
  }



  const onRemoveFilter = (key, value) => {
    const state = JSON.parse(JSON.stringify(activeFilter));
    state[key].value = state[key].value.filter(e => e !== value)
    setActiveFilter(state)
  }
  const onRemoveAllFilter = () => {
    setActiveFilter(formFilter)
  }

  const renderFilterList = () => {
    let list = []
    let finalList = []
    for(let key in activeFilter){
      let tmp = []
      // if(key !== 'order_by' && key !== "brand" && key !== "pre_order" && key !== "condition"){
      if(!isIn(key, ["order_by", "brand", "pre_order", "condition", "p_min", "p_max", "wholesale", "category"])){
        if(activeFilter[key].hasOwnProperty("value")){
          if(activeFilter[key].value.length > 0){
            activeFilter[key].value.forEach(x => tmp.push({value: x, key: key}))
          }
        }
      }
      tmp.forEach(x => list.push(x.value))
    }
    const merged = brandList.concat(preorderList, conditionList, wholesaleList, list)
    for(let val of merged){
      finalList.push(
        <Tag key={val} closable 
          className="filter-tag"
          closeIcon={<i className="fas fa-times" />}
          onClose={() => onRemoveFilter(val)}
        >
          {val}
        </Tag>
      )
    }
    return finalList
  }

  useEffect(() => {
    dispatch(actions.getBrand())
  }, [])

  useEffect(() => {
    let queryString = router.query
    if(page) queryString["page"] = page

    if(order_by.value[0] !== "") queryString["order_by"] = order_by.value[0]
    else delete queryString["order_by"]

    if(p_min.value) queryString["p_min"] = p_min.value
    else delete queryString["p_min"]

    if(p_max.value) queryString["p_max"] = p_max.value
    else delete queryString["p_max"]

    // item_sub_cat

    if(brand.value.length) queryString["brand"] = brand.value.join(",")
    else delete queryString["brand"]

    if(isBoolean(pre_order.value.toString())) queryString["pre_order"] = pre_order.value
    else delete queryString["pre_order"]

    if(isBoolean(condition.value.toString())) queryString["condition"] = condition.value
    else delete queryString["condition"]

    if(isBoolean(wholesale.value.toString())) queryString["wholesale"] = wholesale.value
    else delete queryString["wholesale"]

    router.replace({
      pathname: "/products",
      query: queryString
    })
  }, [activeFilter, user])

  useEffect(() => {
    if(!searchQuery) return
    console.log(searchQuery)
    const state = JSON.parse(JSON.stringify(activeFilter))
    if(searchQuery.hasOwnProperty("page")) {
      setPage(searchQuery.page)
    }
    if(searchQuery.hasOwnProperty("order_by")) {
      state.order_by.value = [searchQuery.order_by]
    }
    if(searchQuery.hasOwnProperty("p_min")){
      state.p_min.value = searchQuery.p_min
    }
    if(searchQuery.hasOwnProperty("p_max")){
      state.p_max.value = searchQuery.p_max
    }
    // item_sub_cat
    if(searchQuery.hasOwnProperty("brand")){
      const brands = searchQuery.brand.split(",").map(x => parseInt(x))
      state.brand.value = brands
      for(let val of brands) {
        axios.get(`/brands/get-brand/${val}`)
          .then(res => {
            setBrandList(brand => brand.concat(res.data.name))
          })
      }
    }
    if(searchQuery.hasOwnProperty("pre_order")){
      state.pre_order.value = [searchQuery.pre_order]
      if(searchQuery.pre_order == "true") setPreorderList("Pre Order")
      else setPreorderList("Ready Stock")
      
    }
    if(searchQuery.hasOwnProperty("condition")){
      state.condition.value = [searchQuery.condition]
      if(searchQuery.condition == "true") setConditionList("Baru")
      else setConditionList("Bekas")
    }
    if(searchQuery.hasOwnProperty("wholesale")){
      state.wholesale.value = [searchQuery.wholesale]
      if(searchQuery.wholesale == "true") setWholesaleList("Harga Grosir")
      else setWholesaleList([])
    }
    setActiveFilter(state)
  }, [])

  return(
    <>
      <Container className="pt-4 pb-2">
        <RowB>
          <ColB className="align-self-center">
            <span className="text-secondary fs-14-s">
              Hasil pencarian dari "<span className="text-dark">{router.query.q ? router.query.q : "Semua"}</span>"
            </span>
          </ColB>
          <ColB className="d-none d-lg-block">
            <Form inline className="float-right">
              <Form.Label className="my-1 mr-2">
                Urutkan:
              </Form.Label>
              <Select value={order_by.value} style={{ width: 150 }} onChange={onSortChange} dropdownClassName="idx-1020">
                {sortList.map(sort => (
                  <Select.Option key={sort.value} value={sort.value}>{sort.label}</Select.Option>
                ))}
              </Select>
            </Form>
          </ColB>
        </RowB>
      </Container>
      <hr />

      <Container className="pb-3 pt-3">
        <RowB>
          <ColB className="col-3 d-none d-lg-block ">
            <h6>Filter</h6>
            <Card className="border-0 shadow-filter">
              <Menu
                className="filter-menu noselect"
                defaultOpenKeys={['kategori', 'rating', 'harga', 'brand', 'kondisi', 'lainnya']}
                mode="inline"
                multiple={true}
                selectedKeys={category.value}
                onSelect={(e) => onCategoryChange(e, "select")}
                onDeselect={(e) => onCategoryChange(e, "deselect")}
              >
                <Menu.SubMenu 
                  key="kategori" 
                  className="scrollable-submenu-category title-filter" 
                  title={renderTitle('Kategori')} 
                >
                  {allCategories.map(category => (
                    <Menu.SubMenu 
                      key={category.categories_id} 
                      title={renderSubTitle(category.categories_name, category, "category")}
                      onTitleClick={e => console.log(e)}
                    >
                      {category.sub_categories.map(sub => (
                        <Menu.SubMenu 
                          key={sub.sub_categories_id} 
                          title={renderSubTitle(sub.sub_categories_name, sub, "sub")} 
                          className="pl-3"
                        >
                          {sub.item_sub_categories.map(item => (
                            <Menu.Item 
                              key={item.item_sub_categories_id} 
                              className="text-secondary"
                            >
                              {item.item_sub_categories_name}
                            </Menu.Item>
                          ))}
                        </Menu.SubMenu>
                      ))}
                    </Menu.SubMenu>
                  ))}
                </Menu.SubMenu>

                {/*
                <Menu.SubMenu key="rating" className="filter-checkbox title-filter" title={renderTitle('Rating')}>
                  <div className="p-l-20 p-r-20">
                    <Checkbox.Group className="w-100" onChange={onRatingChange} value={rating.value}>
                      {ratingList.map(x => (
                        <Checkbox value={x} className="rating-checkbox" key={x}>
                          <Rate disabled defaultValue={1} count={1} className="filter-rate fs-14" />
                          <span className="text-secondary">{x}</span>
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </div>
                </Menu.SubMenu>
                */}

                <Menu.SubMenu key="harga" className="filter-checkbox title-filter" title={renderTitle('Harga')}>
                  <div className="p-l-20 p-r-20 mt-3">
                    <Form.Group>
                      <Form.Label className="text-secondary m-b-13">Harga Minimum</Form.Label>
                      <InputNumber formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        parser={value => value.replace(/\Rp\s?|(\.*)/g, "")}
                        min={1}
                        className={`w-100`}
                        value={p_min.value}
                        onChange={(e) => onPriceChange(e, "p_min")}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label className="text-secondary m-b-13">Harga Maksimum</Form.Label>
                      <InputNumber formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        parser={value => value.replace(/\Rp\s?|(\.*)/g, "")}
                        min={2}
                        className={`w-100`}
                        value={p_max.value}
                        onChange={(e) => onPriceChange(e, "p_max")}
                      />
                    </Form.Group>
                  </div>
                  <Menu.Item className="checkbox-item">
                    <Checkbox.Group className="w-100" onChange={onWholesaleChange} value={wholesale.value}>
                      <Checkbox
                        value="true"
                        label="Harga Grosir" 
                        className="rating-checkbox" 
                        onChange={(e) => onWholesaleChange(e, "label")}
                      >
                        <span className="text-secondary">Harga Grosir</span>
                      </Checkbox>
                    </Checkbox.Group>
                  </Menu.Item>
                </Menu.SubMenu>

                <Menu.SubMenu key="kondisi" className="scrollable-submenu title-filter" title={renderTitle('Kondisi')}>
                  <div className="p-l-20 p-r-20">
                    <Checkbox.Group className="w-100" onChange={onConditionChange} value={condition.value}>
                      <Checkbox 
                        value="true"
                        label="Baru" 
                        className="rating-checkbox" 
                        onChange={(e) => onConditionChange(e, "label")}
                      >
                        <span className="text-secondary">Baru</span>
                      </Checkbox>
                      <Checkbox 
                        value="false"
                        label="Bekas" 
                        className="rating-checkbox" 
                        onChange={(e) => onConditionChange(e, "label")}
                      >
                        <span className="text-secondary">Bekas</span>
                      </Checkbox>
                    </Checkbox.Group>
                  </div>
                </Menu.SubMenu>

                <Menu.SubMenu key="brand" className="scrollable-submenu title-filter" title={renderTitle('Brand')}>
                  <div className="p-l-20 p-r-20">
                    <Checkbox.Group className="w-100" onChange={onBrandChange} value={brand.value}>
                      {brands && brands.length > 0 && brands.map(({id, name}) => (
                        <Checkbox 
                          key={id} 
                          value={id} 
                          label={name} 
                          className="rating-checkbox" 
                          onChange={(e) => onBrandChange(e, "label")}
                        >
                          <span className="text-secondary">{name}</span>
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </div>
                </Menu.SubMenu>

                <Menu.SubMenu key="lainnya" className="scrollable-submenu title-filter" title={renderTitle('Lainnya')}>
                  <div className="p-l-20 p-r-20">
                    <Checkbox.Group className="w-100" onChange={onPreOrderChange} value={pre_order.value}>
                      <Checkbox 
                        value="true"
                        label="Pre Order" 
                        className="rating-checkbox" 
                        onChange={(e) => onPreOrderChange(e, "label")}
                      >
                        <span className="text-secondary">Pre Order</span>
                      </Checkbox>
                      <Checkbox 
                        value="false"
                        label="Ready Stock" 
                        className="rating-checkbox" 
                        onChange={(e) => onPreOrderChange(e, "label")}
                      >
                        <span className="text-secondary">Ready Stock</span>
                      </Checkbox>
                    </Checkbox.Group>
                  </div>
                </Menu.SubMenu>

              </Menu>
            </Card>
          </ColB> 




          <ColB>
            <h4 className="mb-2 d-none d-lg-block">Produk</h4>
            {renderFilterList().length > 0 && (
              <div className="mb-3 d-none d-lg-block noselect">
                <span className="text-secondary font-weight-light">Filter aktif: </span>
                {renderFilterList()}
                <a className="text-tridatu fs-14" onClick={onRemoveAllFilter}>Hapus Semua</a>
              </div>
            )}

            <Row gutter={[16, 16]}>
              <AnimatePresence>
                {products && products.data && products.data.length > 0 && products.data.map(product => (
                  <Col lg={6} md={8} sm={12} xs={12} key={product.products_id}>
                    <CardProductMemo data={product} />
                  </Col>
                ))}
              </AnimatePresence>
              <AnimatePresence>
                {!loadingProduct && products && products.data && products.data.length == 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: ".2" }}
                    className="w-100 mt-5"
                  >
                    <Empty className="my-5" description={<span className="text-secondary">Produk tidak tersedia</span>} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Row>

            <RowB className="mt-4">
              <ColB className="align-self-center text-center">
                {products !== null && products && products.data && products.data.length > 0 && (
                  <Card.Body className="text-center">
                    <Pagination 
                      total={products.total} 
                      // goTo={pageChange} 
                      // current={currentPage} 
                      hideOnSinglePage 
                      // pageSize={perPage}
                    />
                  </Card.Body>
                )}
              </ColB>
            </RowB>
          </ColB>
        </RowB>

        <RowB className="fixed-bottom text-center mb-3 d-lg-none">
          <ColB>
            <ButtonBoot variant="dark" className="badge-pill px-3 py-2 fs-14 shadow" onClick={showDrawer}>
              {renderFilterList().length > 0 ? (
                <Badge variant="light" className="mr-2">{renderFilterList().length}</Badge>
              ) : (
                <>
                  <i className="far fa-filter mr-2" />
                </>
              )}
              Filter
            </ButtonBoot>
          </ColB>
        </RowB>
      </Container>












      {/*FILTER MOBILE*/}
      <Drawer
        placement="bottom"
        title="Filter"
        closeIcon={
          <span 
            onClick={onRemoveAllFilter}
            className="font-weight-lighter fs-14 text-tridatu"
          >
            Reset
          </span>
        }
        onClose={onClose}
        visible={visible}
        bodyStyle={{padding: 0, backgroundColor:'#f5f5f5'}}
        className="d-block d-sm-block d-md-block d-lg-none d-xl-none"
        height="100%"
        zIndex="1030"
        headerStyle={{ border: '0px', boxShadow:'rgba(0,0,0,0.18) 0px 1px 15px', zIndex: '1' }}
        footer={
          <div style={{ textAlign: 'right' }} >
           <ButtonBoot 
             variant="link" 
             className="mr-2 rounded-0 text-reset"
             onClick={onClose}
           >
             Batal
           </ButtonBoot>
           <ButtonBoot 
             className="btn-tridatu rounded-0"
             onClick={onClose}
           > 
             Terapkan
           </ButtonBoot>
          </div>
        }
      >
        <Card className="border-0 rounded-0 w-100 card-mobile-filter">
          <Card.Body>
            <h6 className="mb-3">Urutkan</h6>
            {sortList.map(tag => (
              <Tag.CheckableTag
                key={tag}
                checked={order_by.value.indexOf(tag) > -1}
                onChange={() => onSortMobileChange(tag)}
                className="filter-tag filter-tag-mobile"
              >
                {tag}
              </Tag.CheckableTag>
            ))}
          </Card.Body>
        </Card>

        <Card className="border-0 rounded-0 w-100 card-mobile-filter noselect">
          <Card.Body>
            <h6>Kategori</h6>
            {allCategories.length == 0 && (
              <Empty className="my-5" description={<span className="text-secondary">Kategori tidak tersedia</span>} />
            )}
            <Tabs>
              {allCategories.map(category => (
                <Tabs.TabPane tab={category.categories_name} key={category.categories_id}>
                  <Collapse className="category-mobile scrollable-submenu" expandIconPosition="right" accordion>
                    {category.sub_categories.map(sub => (
                      <Collapse.Panel header={sub.sub_categories_name} key={sub.sub_categories_id}>
                        <Checkbox.Group
                          className="w-100" 
                          onChange={onCategoryChangeMobile} 
                          value={category.value}
                        >
                          {sub.item_sub_categories.map(item => (
                            <Checkbox value={item.item_sub_categories_name} className="rating-checkbox" key={item.item_sub_categories_id}>
                              <span className="text-secondary">{item.item_sub_categories_name}</span>
                            </Checkbox>
                          ))}
                        </Checkbox.Group>
                      </Collapse.Panel>
                    ))}
                  </Collapse>
                </Tabs.TabPane>
              ))}

            </Tabs>
          </Card.Body>
        </Card>

        <Card className="border-0 rounded-0 w-100 card-mobile-filter noselect">
          <Card.Body>
            <h6>Rating</h6>
            <Checkbox.Group className="w-100" onChange={onRatingChange} value={rating.value}>
              {ratingList.map(x => (
                <Checkbox value={x} className="rating-checkbox" key={x}>
                  <Rate disabled defaultValue={1} count={1} className="filter-rate" />
                  <span className="text-secondary pl-1">{x}</span>
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Card.Body>
        </Card>

        <Card className="border-0 rounded-0 w-100 card-mobile-filter">
          <Card.Body>
            <h6>Harga</h6>
            <Form.Group>
              <Form.Label className="text-secondary m-b-0">Minimum</Form.Label>
              <InputNumber formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                parser={value => value.replace(/\Rp\s?|(\.*)/g, "")}
                className={`w-100`}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-secondary m-b-0">Maksimum</Form.Label>
              <InputNumber formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                parser={value => value.replace(/\Rp\s?|(\.*)/g, "")}
                className={`w-100`}
              />
            </Form.Group>
            <Form.Group className="mb-1 noselect">
              <Checkbox className="w-100">
                <span className="text-secondary">Diskon</span>
              </Checkbox>
            </Form.Group>
          </Card.Body>
        </Card>

        <Card className="border-0 rounded-0 w-100 card-mobile-filter noselect">
          <Card.Body>
            <h6>Brand</h6>
            <Checkbox.Group className="w-100 scrollable-submenu" onChange={onBrandChange} value={brand.value}>
              {brands && brands.length > 0 && brands.map(({id, name}) => (
                <Checkbox value={name} className="rating-checkbox" key={id}>
                  <span className="text-secondary">{name}</span>
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Card.Body>
        </Card>

      </Drawer>

      <style jsx>{ProductsStyle}</style>
      <style jsx>{`
        :global(.filter-tag-mobile.ant-tag-checkable){
          border: 1px solid #d9d9d9;
        }
        :global(.rating-checkbox){
          width: 100%;
          line-height: 30px;
          display: block;
          margin-left: 0px!important;
          margin-top: 4px;
          margin-bottom: 5px;
        }
        :global(.category-mobile){
          background-color: white;
          border: 0;
        }
        :global(.ant-collapse.category-mobile > .ant-collapse-item:last-of-type){
          border: 0;
        }
        :global(.ant-collapse-icon-position-right.category-mobile > .ant-collapse-item > .ant-collapse-header){
          padding-left: 0;
        }
      `}</style>
    </>
  )
}

ProductContainer.getInitialProps = async ctx => {
  const searchQuery = ctx.query
  await ctx.store.dispatch(actions.getProducts({ ...searchQuery, per_page: 20, live: "true" }))
  return { searchQuery: searchQuery }
}

export default ProductContainer
