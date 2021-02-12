import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from 'framer-motion'
import { Select, Col, Row, Empty, Tag } from 'antd';

import axios from 'lib/axios'
import dynamic from 'next/dynamic'
import RowB from "react-bootstrap/Row";
import ColB from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import isBoolean from 'validator/lib/isBoolean';
import isIn from 'validator/lib/isIn';
import isEmpty from 'validator/lib/isEmpty';

import SidebarLoading from "components/Products/SidebarLoading"
import CardProductLoading from "components/Card/ProductLoading";
import Pagination from "components/Pagination";
import formFilter from "formdata/formFilter";
import renameCategory from "lib/renameCategory"

import { sortListProduct } from "data/products"
import * as actions from "store/actions";
import ProductsStyle from "components/Products/style";

const SidebarLoadingMemo = React.memo(SidebarLoading);
const CardProductLoadingMemo = React.memo(CardProductLoading);

const SidebarContainer = dynamic(() => import("components/Products/Sidebar"), { ssr: false, loading: () => <SidebarLoadingMemo />  })
const SidebarContainerMemo = React.memo(SidebarContainer);

const CardProduct = dynamic(() => import("components/Card/Product"), { ssr: false, loading: () => <CardProductLoadingMemo />  })
const CardProductMemo = React.memo(CardProduct);

const TagFilter = ({ onRemove, label }) => (
  <Tag closable 
    onClose={onRemove}
    className="filter-tag"
    closeIcon={<i className="fas fa-times ml-1" />}
  >
    {label}
  </Tag>
)

const per_page = 20;
const ProductContainer = ({ searchQuery, finalCategories }) => {
  const dispatch = useDispatch()
  const router = useRouter();

  /* GLOBAL STATE */
  const products = useSelector(state => state.products.products)
  const loadingProduct = useSelector(state => state.products.loading)
  const user = useSelector(state => state.auth.user)
  /* GLOBAL STATE */

  const [activeFilter, setActiveFilter] = useState(formFilter);

  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [preorderList, setPreorderList] = useState([]);
  const [conditionList, setConditionList] = useState([]);
  const [wholesaleList, setWholesaleList] = useState([]);
  const [readyStockList, setReadyStockList] = useState([]);

  const [categoryKeys, setCategoryKeys] = useState([searchQuery.ck]);

  const [page, setPage] = useState(products.page);
  const [treeData, setTreeData] = useState(finalCategories);

  const { order_by, category, item_sub_cat, rating, brand } = activeFilter;
  const { p_min, p_max, pre_order, ready_stock, discount, condition, wholesale } = activeFilter;

  const onFilterChange = (e, item) => {
    if(item){
      const data = {
        ...activeFilter,
        [item]: { ...activeFilter[item], value: e }
      }
      setActiveFilter(data)
    }
    setPage(1)
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
    setPage(1)
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
    setPage(1)
  }

  const onBrandChange = (e, label) => {
    if(label){
      if(e.target.checked) setBrandList(brand => brand.concat({key: e.target.value, label: e.target.label}))
      else setBrandList(brandList.filter(brand => brand.key !== e.target.value))
    }
    const data = { ...activeFilter, brand: {...brand, value: e} }
    setActiveFilter(data)
    setPage(1)
  }

  const onDiscountChange = (e, label) => {
    if(label){
      if(e.target.checked) setPreorderList([e.target.label])
      else setPreorderList([])
    } else {
      const data = { ...activeFilter, discount: { ...discount, value: [e.slice(-1)[0]] } }
      const emptydata = { ...activeFilter, discount: { ...discount, value: [] } }
      if(e.slice(-1)[0] !== undefined) setActiveFilter(data)
      else setActiveFilter(emptydata)
    }
    setPage(1)
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
    setPage(1)
  }

  const onReadyStockChange = (e, label) => {
    if(label){
      if(e.target.checked) setReadyStockList([e.target.label])
      else setReadyStockList([])
    } else {
      const data = { ...activeFilter, ready_stock: { ...ready_stock, value: [e.slice(-1)[0]] } }
      const emptydata = { ...activeFilter, ready_stock: { ...ready_stock, value: [] } }
      if(e.slice(-1)[0] !== undefined) setActiveFilter(data)
      else setActiveFilter(emptydata)
    }
    setPage(1)
  }

  const onCategoryChange = (_, info) => {
    let label = "", key = "", id = []
    for(let val of info.selectedNodes){
      if(val.children){
        for(let val2 of val.children){
          if(val2.children){
            for(let val3 of val2.children){
              id.push(val3.key)
            }
          } 
          else id.push(val2.key)
        }
      } 
      else id.push(val.key)
    }
    if(info.node){
      key = info.node.key
      label = info.node.title
    }
    if(isIn(key.toString(), [categoryKeys])){
      setCategoryKeys([])
      const data = { ...activeFilter, category: {...category, value: []} }
      setActiveFilter(data)
    } else{
      setCategoryKeys([key])
      const data = { ...activeFilter, category: {...category, value: [key]} }
      setActiveFilter(data)
    }
    if(isIn(label, categoryList)) setCategoryList([])
    else setCategoryList([label])

    const data = { ...activeFilter, item_sub_cat: {...item_sub_cat, value: id.join(",")} }
    setActiveFilter(data)
    setPage(1)
  }

  useEffect(() => {
    if(products && products.data){
      setPage(products.page)
    }
  }, [products])

  useEffect(() => {
    dispatch(actions.getBrand())
  }, [])

  useEffect(() => {
    setTreeData(finalCategories)
  }, [finalCategories])

  useEffect(() => {
    let queryString = router.query
    if(page) queryString["page"] = page

    if(order_by.value[0] !== "" || order_by.value !== "") queryString["order_by"] = order_by.value
    else delete queryString["order_by"]
    if(order_by.value === "" || order_by.value[0] === "") delete queryString["order_by"]

    if(p_min.value) queryString["p_min"] = p_min.value
    else delete queryString["p_min"]

    if(p_max.value) queryString["p_max"] = p_max.value
    else delete queryString["p_max"]

    if(brand.value.length) queryString["brand"] = brand.value.join(",")
    else delete queryString["brand"]

    if(isBoolean(pre_order.value.toString())) queryString["pre_order"] = pre_order.value
    else delete queryString["pre_order"]

    if(isBoolean(condition.value.toString())) queryString["condition"] = condition.value
    else delete queryString["condition"]

    if(isBoolean(wholesale.value.toString())) queryString["wholesale"] = wholesale.value
    else delete queryString["wholesale"]

    //for category auto active when refreshed
    if(categoryKeys.length > 0 && categoryList.length > 0) {
      queryString["ck"] = categoryKeys[0]
      queryString["cn"] = categoryList[0]
      if(!isEmpty(item_sub_cat.value)) queryString["item_sub_cat"] = item_sub_cat.value
      else delete queryString["item_sub_cat"]
    } else {
      delete queryString["cn"]
      delete queryString["ck"]
      delete queryString["item_sub_cat"]
    }

    router.replace({
      pathname: "/products",
      query: queryString
    })
  }, [activeFilter, user, page, categoryKeys, categoryList])

  useEffect(() => {
    if(!searchQuery) return
    console.log(searchQuery)
    const state = JSON.parse(JSON.stringify(activeFilter))
    if(searchQuery.hasOwnProperty("page")) {
      if(+searchQuery.page !== page) setPage(searchQuery.page)
      else setPage(page)
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
    if(searchQuery.hasOwnProperty("brand")){
      const brands = searchQuery.brand.split(",").map(x => parseInt(x))
      state.brand.value = brands
      for(let val of brands) {
        axios.get(`/brands/get-brand/${val}`)
          .then(res => {
            const data = { key: res.data.id, label: res.data.name }
            setBrandList(brand => brand.concat(data))
          })
      }
    }
    if(searchQuery.hasOwnProperty("pre_order")){
      state.pre_order.value = [searchQuery.pre_order]
      if(searchQuery.pre_order == "true") setPreorderList(["Pre Order"])
      else setPreorderList([])
    }
    if(searchQuery.hasOwnProperty("condition")){
      state.condition.value = [searchQuery.condition]
      if(searchQuery.condition == "true") setConditionList(["Baru"])
      else setConditionList(["Bekas"])
    }
    if(searchQuery.hasOwnProperty("wholesale")){
      state.wholesale.value = [searchQuery.wholesale]
      if(searchQuery.wholesale == "true") setWholesaleList(["Harga Grosir"])
      else setWholesaleList([])
    }
    //for category auto active when refreshed
    if(searchQuery.hasOwnProperty("ck") && searchQuery.hasOwnProperty("cn")){
      setCategoryKeys([searchQuery.ck])
      setCategoryList([searchQuery.cn])
      if(searchQuery.hasOwnProperty("item_sub_cat")){
        state.item_sub_cat.value = searchQuery.item_sub_cat
      }
    }
    setActiveFilter(state)
  }, [])

  const showPagination = products !== null && products && products.data && products.data.length > 0 && (products.next_num !== null || products.prev_num !== null);


  const onRemoveAllFilter = () => {
    setActiveFilter(formFilter)
    setCategoryList([])
    setCategoryKeys([])
    setBrandList([])
    setPreorderList([])
    setConditionList([])
    setWholesaleList([])
    setReadyStockList([])
  }

  const renderActiveFilter = () => {
    let category = [], brand = [], preorder = [], condition = [], wholesalefilter = [], readystockfilter = []

    const onRemoveCategory = () => {
      setCategoryList([])
      setCategoryKeys([])
    }
    for(let val of categoryList){
      category.push(<TagFilter key={val} onRemove={onRemoveCategory} label={val} />)
    }

    const onRemoveBrand = key => {
      setBrandList(brandList.filter(brand => brand.key !== key))
      const newBrand = activeFilter.brand.value.filter(b => b !== key)
      const data = { ...activeFilter, brand: {value: newBrand} }
      setActiveFilter(data)
    }
    for(let val of brandList){
      brand.push(<TagFilter key={val.key} label={val.label} onRemove={() => onRemoveBrand(val.key)} />)
    }

    const onRemovePreorder = () => {
      setPreorderList([])
      const emptydata = { ...activeFilter, pre_order: { ...pre_order, value: [] } }
      setActiveFilter(emptydata)
    }
    for(let val of preorderList){
      preorder.push(<TagFilter key={val} label={val} onRemove={onRemovePreorder} />)
    }

    const onRemoveCondition = () => {
      setConditionList([])
      const emptydata = { ...activeFilter, condition: { ...condition, value: [] } }
      setActiveFilter(emptydata)
    }
    for(let val of conditionList){
      condition.push(<TagFilter key={val} label={val} onRemove={onRemoveCondition} />)
    }

    const onRemoveWholesale = () => {
      setWholesaleList([])
      const emptydata = { ...activeFilter, wholesale: { ...wholesale, value: [] } }
      setActiveFilter(emptydata)
    }
    for(let val of wholesaleList){
      wholesalefilter.push(<TagFilter key={val} label={val} onRemove={onRemoveWholesale} />)
    }

    const onRemoveReadystock = () => {
      setReadyStockList([])
      const emptydata = { ...activeFilter, ready_stock: { ...ready_stock, value: [] } }
      setActiveFilter(emptydata)
    }
    for(let val of readyStockList){
      readystockfilter.push(<TagFilter key={val} label={val} onRemove={onRemoveReadystock} />)
    }

    return category.concat(brand, preorder, condition, wholesalefilter, readystockfilter)
  }

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
              <Select 
                value={order_by.value} 
                style={{ width: 150 }} 
                dropdownClassName="idx-1020"
                onChange={e => onFilterChange(e, "order_by")} 
              >
                {sortListProduct.map(sort => (
                  <Select.Option key={sort.value} value={sort.value}>{sort.label}</Select.Option>
                ))}
              </Select>
            </Form>
          </ColB>
        </RowB>
      </Container>
      <hr />

      <Container className="pb-5 pt-3">
        <RowB>
          <SidebarContainerMemo
            treeData={treeData}
            filterState={activeFilter}
            categoryKeys={categoryKeys}
            onChange={onFilterChange}
            onBrandChange={onBrandChange}
            onPreOrderChange={onPreOrderChange}
            onCategoryChange={onCategoryChange}
            onConditionChange={onConditionChange}
            onWholesaleChange={onWholesaleChange}
            onDiscountChange={onDiscountChange}
            onReadyStockChange={onReadyStockChange}
          />

          <ColB>
            <h4 className="mb-2 d-none d-lg-block">Produk</h4>
            {renderActiveFilter().length > 0 && (
              <div className="mb-3 d-none d-lg-block noselect">
                <span className="text-secondary font-weight-light">Filter aktif: </span>
                {renderActiveFilter()}
                <a className="text-tridatu fs-14" onClick={onRemoveAllFilter}>Hapus Semua</a>
              </div>
            )}

            <AnimatePresence>
              <Row gutter={[16, 16]}>
                {products && products.data && products.data.length > 0 && products.data.map(product => (
                  <Col lg={6} md={8} sm={12} xs={12} key={product.products_id}>
                    <CardProductMemo data={product} />
                  </Col>
                ))}
                {loadingProduct && (
                  <>
                    {[...Array(16)].map((_,i) => (
                      <Col lg={6} md={8} sm={12} xs={12} key={i}>
                        <CardProductLoading />
                      </Col>
                    ))}
                  </>
                )}
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
              </Row>
            </AnimatePresence>


            <RowB className="mt-4">
              <ColB className="align-self-center text-center">
                {showPagination && (
                  <Card.Body className="text-center">
                    <Pagination 
                      current={page} 
                      hideOnSinglePage 
                      pageSize={per_page}
                      total={products.total} 
                      goTo={val => setPage(val)} 
                    />
                  </Card.Body>
                )}
              </ColB>
            </RowB>
          </ColB>
        </RowB>

      </Container>

      <style jsx>{ProductsStyle}</style>
    </>
  )
}

ProductContainer.getInitialProps = async ctx => {
  const searchQuery = ctx.query
  const categories = await axios.get("/categories/")
  const finalCategories = await renameCategory(categories.data)
  await ctx.store.dispatch(actions.getProducts({ ...searchQuery, per_page: per_page, live: "true" }))

  return { searchQuery: searchQuery, finalCategories: finalCategories }
}

export default ProductContainer
