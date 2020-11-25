import { withAuth } from 'lib/withAuth'
import { useState, useEffect } from 'react'
import { Tabs, Row, Col } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from 'framer-motion'

import Card from 'react-bootstrap/Card'

import { formCategories } from 'formdata/formCategories'
import * as actions from "store/actions";
import axios, { jsonHeaderHandler, resNotification, signature_exp } from 'lib/axios'
import CardCategory from "components/Card/Admin/Categories/Category.jsx"
import ModalEditCategory from "components/Modal/Admin/Categories/Category"

import AddStyleAdmin from 'components/Admin/addStyle'

const CATEGORIES = "categories"
const SUBCATEGORIES = "sub-categories"
const ITEMSUBCATEGORIES = "item-sub-categories"

const Category = () => {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState(formCategories)
  const [showEditCategory, setShowEditCategory] = useState(false)

  const categoriesData = useSelector(state => state.categories.categories)
  const loadingCategories = useSelector(state => state.categories.loading)

  const editData = (res, setState) => {
    const { id_category, name_category } = res.data
    const data = {
      id_category: id_category,
      name_category: { value: name_category, isValid: true, message: "" },
    }
    setState(data)
  }

  const editCategoryHandler = id => {
    axios.get(`/categories/get-category/${id}`, jsonHeaderHandler())
      .then(res => {
        editData(res, setCategories)
        setShowEditCategory(true)
      })
      .catch(err =>{
        const errDetail = err.response.data.detail
        if(errDetail == signature_exp){
          axios.get(`/categories/get-category/${id}`, jsonHeaderHandler())
            .then(res => {
              editData(res, setCategories)
              setShowEditCategory(true)
            })
            .catch(() => {})
        } else if(typeof(errDetail) === "string") {
          resNotification("error", "Error", errDetail)
        } else {
          resNotification("error", "Error", errDetail[0].msg)
        }
      })
  }

  const deleteCategoryHandler = id => {
    axios.delete(`/categories/delete/${id}`, jsonHeaderHandler())
      .then(res => {
        dispatch(actions.getCategories(false))
        resNotification("success", "Success", res.data.detail)
      })
      .catch(err => {
        const errDetail = err.response.data.detail
        if(errDetail == signature_exp){
          dispatch(actions.getCategories(false))
          resNotification("success", "Success", "Successfully delete the category")
        } else if(typeof(errDetail) === "string") {
          resNotification("error", "Error", errDetail)
        } else {
          resNotification("error", "Error", errDetail[0].msg)
        }
      })
  }

  const closeEditCategoryHandler = () => {
    setShowEditCategory(false)
  }

  useEffect(() => {
    dispatch(actions.getCategories(false))
  }, [dispatch])

  return(
    <>
      <Card className="border-0 shadow-none card-add-product">
        <Card.Body className="p-3 border-bottom">
          <Tabs className="order-tabs noselect">
            <Tabs.TabPane tab="Kategori" key={CATEGORIES}>
              <Row gutter={[16, 16]}>
                <AnimatePresence>
                  {categoriesData.map(data => (
                    <Col key={data.id_category} xl={4} lg={6} md={8} sm={8} xs={12}>
                      <CardCategory 
                        data={data} 
                        showEditHandler={() => editCategoryHandler(data.id_category)}
                        deleteHandler={() => deleteCategoryHandler(data.id_category)}
                        loading={loadingCategories}
                      />
                    </Col>
                  ))}
                </AnimatePresence>
              </Row>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Sub Kategori" key={SUBCATEGORIES}>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Item Sub Kategori" key={ITEMSUBCATEGORIES}>
            </Tabs.TabPane>
          </Tabs>
        </Card.Body>
      </Card>

      <ModalEditCategory 
        show={showEditCategory} 
        close={closeEditCategoryHandler}
        currentCategory={categories}
      />

      <style jsx>{AddStyleAdmin}</style>
    </>
  )
}

export default withAuth(Category)
