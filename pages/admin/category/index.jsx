import { withAuth } from 'lib/withAuth'
import { useState, useEffect } from 'react'
import { Tabs, Row, Col, List, Skeleton, Popconfirm, Empty, Collapse } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from 'framer-motion'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import Card from 'react-bootstrap/Card'

import { formCategories, formSubCategories, formItemSubCategories } from 'formdata/formCategories'
import * as actions from "store/actions";
import axios, { jsonHeaderHandler, resNotification, signature_exp } from 'lib/axios'
import CardCategory from "components/Card/Admin/Categories/Category.jsx"
import ModalEditCategory from "components/Modal/Admin/Categories/Category"
import ModalEditSubCategory from "components/Modal/Admin/Categories/SubCategory"
import ModalEditItemSubCategory from "components/Modal/Admin/Categories/ItemSubCategory"

import AddStyleAdmin from 'components/Admin/addStyle'

const CATEGORIES = "categories"
const SUBCATEGORIES = "sub-categories"
const ITEMSUBCATEGORIES = "item-sub-categories"

const Category = () => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState(CATEGORIES)
  const [categories, setCategories] = useState(formCategories)
  const [subCategories, setSubCategories] = useState(formSubCategories)
  const [itemSubCategories, setItemSubCategories] = useState(formItemSubCategories)

  const [showEditCategory, setShowEditCategory] = useState(false)
  const [showEditSubCategory, setShowEditSubCategory] = useState(false)
  const [showEditItemSubCategory, setShowEditItemSubCategory] = useState(false)

  const categoriesData = useSelector(state => state.categories.categories)
  const allCategoriesData = useSelector(state => state.categories.allCategories)
  const loadingCategories = useSelector(state => state.categories.loading)

  const onTabClick = key => {
    if(key === CATEGORIES) dispatch(actions.getCategories(false))
    else dispatch(actions.getCategories(true))
    setActiveTab(key)
  }

  /* CATEGORIES */
  const editDataCategories = (res, setState) => {
    const { id, name } = res.data
    const data = {
      id_category: id,
      name: { value: name, isValid: true, message: null },
    }
    setState(data)
  }

  const editCategoryHandler = id => {
    axios.get(`/categories/get-category/${id}`, jsonHeaderHandler())
      .then(res => {
        editDataCategories(res, setCategories)
        setShowEditCategory(true)
      })
      .catch(err =>{
        const errDetail = err.response.data.detail
        if(errDetail == signature_exp){
          axios.get(`/categories/get-category/${id}`, jsonHeaderHandler())
            .then(res => {
              editDataCategories(res, setCategories)
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

  /* SUB CATEGORIES */
  const editDataSubCategories = (res, setState) => {
    const { category_id, id, name } = res.data
    const data = {
      id_sub_category: id,
      category_id: { value: category_id, isValid: true, message: null },
      name: { value: name, isValid: true, message: null },
    }
    setState(data)
  }

  const editSubCategoryHandler = id => {
    axios.get(`/sub-categories/get-sub-category/${id}`)
      .then(res => {
        editDataSubCategories(res, setSubCategories)
        setShowEditSubCategory(true)
      })
      .catch(err =>{
        const errDetail = err.response.data.detail
        if(errDetail == signature_exp){
          axios.get(`/sub-categories/get-sub-category/${id}`)
            .then(res => {
              editDataSubCategories(res, setSubCategories)
              setShowEditSubCategory(true)
            })
            .catch(() => {})
        } else if(typeof(errDetail) === "string") {
          resNotification("error", "Error", errDetail)
        } else {
          resNotification("error", "Error", errDetail[0].msg)
        }
      })
  }

  const deleteSubCategoryHandler = id => {
    axios.delete(`/sub-categories/delete/${id}`, jsonHeaderHandler())
      .then(res => {
        dispatch(actions.getCategories(true))
        resNotification("success", "Success", res.data.detail)
      })
      .catch(err => {
        const errDetail = err.response.data.detail
        if(errDetail == signature_exp){
          dispatch(actions.getCategories(true))
          resNotification("success", "Success", "Successfully delete the sub-category.")
        } else if(typeof(errDetail) === "string") {
          resNotification("error", "Error", errDetail)
        } else {
          resNotification("error", "Error", errDetail[0].msg)
        }
      })
  }

  /* ITEM SUB CATEGORIES */
  const editDataItemSubCategories = (res, setState) => {
    const { sub_category_id, id, name } = res.data
    const data = {
      item_sub_categories_id: id,
      sub_category_id: { value: sub_category_id, isValid: true, message: null },
      name: { value: name, isValid: true, message: null },
    }
    setState(data)
  }

  const editItemSubCategoryHandler = id => {
    axios.get(`/item-sub-categories/get-item-sub-category/${id}`)
      .then(res => {
        editDataItemSubCategories(res, setItemSubCategories)
        setShowEditItemSubCategory(true)
      })
      .catch(err =>{
        const errDetail = err.response.data.detail
        if(errDetail == signature_exp){
          axios.get(`/item-sub-categories/get-item-sub-category/${id}`)
            .then(res => {
              editDataItemSubCategories(res, setItemSubCategories)
              setShowEditItemSubCategory(true)
            })
            .catch(() => {})
        } else if(typeof(errDetail) === "string") {
          resNotification("error", "Error", errDetail)
        } else {
          resNotification("error", "Error", errDetail[0].msg)
        }
      })
  }

  const deleteItemSubCategoryHandler = id => {
    axios.delete(`/item-sub-categories/delete/${id}`, jsonHeaderHandler())
      .then(res => {
        dispatch(actions.getAllCategories())
        resNotification("success", "Success", res.data.detail)
      })
      .catch(err => {
        const errDetail = err.response.data.detail
        if(errDetail == signature_exp){
          dispatch(actions.getAllCategories())
          resNotification("success", "Success", "Successfully delete the item sub-category.")
        } else if(typeof(errDetail) === "string") {
          resNotification("error", "Error", errDetail)
        } else {
          resNotification("error", "Error", errDetail[0].msg)
        }
      })
  }

  const closeEditCategoryHandler = () => { setShowEditCategory(false) }
  const closeEditSubCategoryHandler = () => { setShowEditSubCategory(false) }
  const closeEditItemSubCategoryHandler = () => { setShowEditItemSubCategory(false) }

  useEffect(() => {
    dispatch(actions.getCategories(false))
    return () => dispatch(actions.getCategoriesSuccess([]))
  }, [dispatch])

  useEffect(() => {
    if(activeTab === ITEMSUBCATEGORIES){
      dispatch(actions.getAllCategories())
      return () => dispatch(actions.getAllCategories([]))
    }
  }, [activeTab])

  return(
    <>
      <Card className="border-0 shadow-none card-add-product">
        <Card.Body className="p-3 border-bottom">
          <Tabs className="order-tabs noselect" activeKey={activeTab} onTabClick={onTabClick}>

            <Tabs.TabPane tab="Kategori" key={CATEGORIES}>
              <Row gutter={[16, 16]}>
                <AnimatePresence>
                  {!loadingCategories && activeTab === CATEGORIES && categoriesData.map(data => (
                    <Col key={data.categories_id} xl={4} lg={6} md={8} sm={8} xs={12}>
                      <CardCategory 
                        data={data} 
                        showEditHandler={() => editCategoryHandler(data.categories_id)}
                        deleteHandler={() => deleteCategoryHandler(data.categories_id)}
                        loading={loadingCategories}
                      />
                    </Col>
                  ))}
                </AnimatePresence>

                <AnimatePresence>
                  {categoriesData.length == 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: ".2" }}
                      className="w-100"
                    >
                      <Empty 
                        className="my-5" 
                        image={Empty.PRESENTED_IMAGE_SIMPLE} 
                        description={<span className="text-secondary">Kategori kosong</span>} 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Row>
            </Tabs.TabPane>



            <Tabs.TabPane tab="Sub Kategori" key={SUBCATEGORIES}>
              <AnimatePresence>
                {categoriesData.length == 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: ".2" }}
                    className="w-100 mt-n2 pb-2"
                  >
                    <Empty 
                      className="my-5" 
                      image={Empty.PRESENTED_IMAGE_SIMPLE} 
                      description={<span className="text-secondary">Sub kategori kosong</span>} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              {categoriesData.length > 0 && (
                <List
                  itemLayout="horizontal"
                  dataSource={categoriesData}
                  renderItem={({categories_name, sub_categories_id, sub_categories_name}) => (
                    <List.Item
                      actions={[
                        <EditOutlined key="edit" onClick={() => editSubCategoryHandler(sub_categories_id)} />,
                        <Popconfirm
                          title="Hapus sub kategori ini?"
                          onConfirm={() => deleteSubCategoryHandler(sub_categories_id)}
                          okText="Ya"
                          cancelText="Batal"
                          placement="bottomRight"
                          arrowPointAtCenter
                        >
                          <DeleteOutlined key="delete" />
                        </Popconfirm>,
                      ]}
                    >
                      <Skeleton title={false} loading={false} active>
                        <List.Item.Meta
                          description={ <div>{categories_name} / <span className="text-dark">{sub_categories_name}</span></div> }
                        />
                      </Skeleton>
                    </List.Item>
                  )}
                />
              )}
            </Tabs.TabPane>



            <Tabs.TabPane tab="Item Sub Kategori" key={ITEMSUBCATEGORIES}>
              <AnimatePresence>
                {allCategoriesData.length == 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: ".2" }}
                    className="w-100 mt-n2 pb-2"
                  >
                    <Empty 
                      className="my-5" 
                      image={Empty.PRESENTED_IMAGE_SIMPLE} 
                      description={<span className="text-secondary">Item sub kategori kosong</span>} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              {allCategoriesData.length > 0 && (
                <Collapse accordion>
                  {allCategoriesData.map(({categories_name, sub_categories}) => (
                    sub_categories.map(({sub_categories_id, sub_categories_name, item_sub_categories}) => (
                      <Collapse.Panel 
                      header={<div className="text-muted">{categories_name} / <span className="text-dark">{sub_categories_name}</span></div>} 
                      key={sub_categories_id}
                      >
                        <List
                          itemLayout="horizontal"
                          dataSource={item_sub_categories}
                          renderItem={({item_sub_categories_id, item_sub_categories_name}) => (
                            <List.Item
                              actions={[
                                <EditOutlined key="edit" onClick={() => editItemSubCategoryHandler(item_sub_categories_id)} />,
                                <Popconfirm
                                  title="Hapus item sub kategori ini?"
                                  onConfirm={() => deleteItemSubCategoryHandler(item_sub_categories_id)}
                                  okText="Ya"
                                  cancelText="Batal"
                                  placement="bottomRight"
                                  arrowPointAtCenter
                                >
                                  <DeleteOutlined key="delete" />
                                </Popconfirm>,
                              ]}
                            >
                              <Skeleton title={false} loading={false} active>
                                <List.Item.Meta
                                  description={ <span className="text-dark">{item_sub_categories_name}</span> }
                                />
                              </Skeleton>
                            </List.Item>
                          )}
                        />
                      </Collapse.Panel>
                    ))
                  ))}
                </Collapse>
              )}
            </Tabs.TabPane>

          </Tabs>
        </Card.Body>
      </Card>

      <ModalEditCategory 
        show={showEditCategory} 
        close={closeEditCategoryHandler}
        currentCategory={categories}
      />

      <ModalEditSubCategory
        show={showEditSubCategory} 
        close={closeEditSubCategoryHandler}
        currentSubCategory={subCategories}
      />

      <ModalEditItemSubCategory
        show={showEditItemSubCategory} 
        close={closeEditItemSubCategoryHandler}
        currentItemSubCategory={itemSubCategories}
      />

      <style jsx>{AddStyleAdmin}</style>
    </>
  )
}

export default withAuth(Category)
