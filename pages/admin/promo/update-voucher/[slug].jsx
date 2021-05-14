import { withAuth } from 'lib/withAuth'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getSelectedKeys } from 'lib/voucher'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Radio, Select, Table, Space } from 'antd'
import { PlusCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import axios, { jsonHeaderHandler, resNotification, signature_exp, formErrorMessage } from 'lib/axios'
import { formTableVoucherIsValid, formTableOngkirIsValid, formLengthVoucherIsValid } from 'formdata/formPromo'
import { columnsPromoCode, columnsSelectedProduct, columnsSelectedBrand, columnsSelectedCategory } from 'data/voucher'
import { columnsVoucherUpdate, columnsOngkirUpdate, columnsSelectedSubCategory, columnsSelectedItemSubCategory } from 'data/voucher'

import id from 'locales/id/admin/promo/new-voucher'
import en from 'locales/en/admin/promo/new-voucher'

import _ from 'lodash'
import Link from 'next/link'
import isIn from 'validator/lib/isIn'
import Button from 'antd-button-color'
import Card from 'react-bootstrap/Card'
import * as actions from 'store/actions'
import isEmpty from 'validator/lib/isEmpty'
import ErrorMessage from 'components/ErrorMessage'
import AddStyleAdmin from 'components/Admin/addStyle'
import EditableCell from 'components/Admin/Voucher/Cell'
import ProductEditableCell from 'components/Admin/Voucher/ProductCell'
import ListCodeEditableCell from 'components/Admin/Voucher/ListCodeCellUpdate'

import BrandVoucherModal from 'components/Modal/Admin/Vouchers/SetupVoucherBrand'
import ProductVoucherModal from 'components/Modal/Admin/Vouchers/SetupVoucherProduct'
import CategoryVoucherModal from 'components/Modal/Admin/Vouchers/SetupVoucherCategory'
import SubCategoryVoucherModal from 'components/Modal/Admin/Vouchers/SetupVoucherSubCategory'
import ItemSubCategoryVoucherModal from 'components/Modal/Admin/Vouchers/SetupVoucherItemSubCategory'

const components = { body: { cell: EditableCell } }
const productComponents = { body: { cell: ProductEditableCell } }
const listCodeComponets = { body: { cell: ListCodeEditableCell } }

const params = { is_code: true, is_other: false }
const initialTypeVoucher = { value: null, label: null }
const ALL_KIND = "all", SPECIFIC_BRAND = "specific_brand", SPECIFIC_PRODUCT = "specific_product", 
      CATEGORY = "category", SUB_CATEGORY = "sub_category", ITEM_SUB_CATEGORY = "item_sub_category"

const tableProps = {
  className: "mt-3",
  scroll: { x:700 },
  pagination: {
    pageSize: 5,
    hideOnSinglePage: true,
  },
  components: productComponents
}

const formLengthVoucher = {
  voucher: { value: 1, isValid: true, message: null },
  selected: { value: 0, isValid: true, message: null }
}

const UpdateVoucher = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const voucherData = useSelector(state => state.promo.promoSlug)
  const applicablePromoData = useSelector(state => state.promo.applicablePromo)
  const multipleBrandData = useSelector(state => state.brand.multipleBrandData)
  const multipleProductData = useSelector(state => state.products.multipleProductData)
  const multipleCategoriesData = useSelector(state => state.categories.multipleCategoriesData)
  const multipleSubCategoriesData = useSelector(state => state.categories.multipleSubCategoriesData)
  const multipleItemSubCategoriesData = useSelector(state => state.categories.multipleItemSubCategoriesData)

  const { locale, query } = router
  const t = locale === "en" ? en : id

  const [loading, setLoading] = useState(false)
  const [dataVoucher, setDataVoucher] = useState([])
  const [dataFreeShipping, setDataFreeShipping] = useState([])
  const [typeVoucher, setTypeVoucher] = useState(initialTypeVoucher)
  const [selectedDataVoucher, setSelectedDataVoucher] = useState([])
  const [selectedDataFreeShipping, setSelectedDataFreeShipping] = useState([])
  const [countVoucherLength, setCountVoucherLength] = useState(formLengthVoucher)

  /*MODAL VOUCHER*/
  const [showBrandModal, setShowBrandModal] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false)
  const [showItemSubCategoryModal, setShowItemSubCategoryModal] = useState(false)

  const [selectedBrand, setSelectedBrand] = useState([])
  const [selectedProduct, setSelectedProduct] = useState([])
  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedSubCategory, setSelectedSubCategory] = useState([])
  const [selectedItemSubCategory, setSelectedItemSubCategory] = useState([])
  /*MODAL VOUCHER*/

  const { promos_id, promos_slug, promos_name, promos_code } = voucherData
  const { selected } = countVoucherLength

  /*RE-STRUCTURE PROMO DATA IN MOUNT COMPONENT*/
  useEffect(() => {
    if(promos_code && promos_code.length > 0){
      let listVoucher = []
      let listOngkirVoucher = []
      for(let item of promos_code){
        const data = {
          key: item.promo_codes_id,
          voucher: {
            code: { value: item.promo_codes_code, isValid: true, message: null },
            quota: { value: item.promo_codes_quota, isValid: true, message: null },
            min_transaction: { value: item.promo_codes_min_transaction, isValid: true, message: null },
            nominal: { value: item.promo_codes_nominal, isValid: true, message: null },
            percent: { value: item.promo_codes_percent, isValid: true, message: null },
            max_discount: { value: item.promo_codes_max_discount, isValid: true, message: null },
            kind: { value: item.promo_codes_kind, isValid: true, message: null },
            applicable_promo: { value: item.promo_codes_applicable_promo, isValid: true, message: null }
          }
        }
        if(item.promo_codes_kind === "ongkir") listOngkirVoucher.push(data)
        else listVoucher.push(data)
      }
      setDataVoucher(listVoucher)
      setDataFreeShipping(listOngkirVoucher)
    }
  }, [voucherData])
  /*RE-STRUCTURE PROMO DATA IN MOUNT COMPONENT*/

  useEffect(() => {
    const { applicable_promo } = applicablePromoData
    if(applicable_promo && applicable_promo.kind){
      getListProductHandler(applicable_promo.kind, applicable_promo.list_id)
    }
  }, [applicablePromoData])

  useEffect(() => {
    if(multipleProductData && multipleProductData.length > 0){
      let tmp = []
      for(let val of multipleProductData){
        if(isIn(val.products_id, _.map(selectedProduct, o => o.key))){
          tmp.push({ key: val.products_id, disabled: true, products: { ...val }})
        } else {
          tmp.push({ key: val.products_id, products: { ...val }})
        }
      }
      setSelectedProduct(tmp)
    }
  }, [multipleProductData])

  useEffect(() => {
    if(multipleBrandData && multipleBrandData.length > 0){
      let tmp = []
      for(let val of multipleBrandData){
        if(isIn(val.id.toString(), _.map(selectedBrand, o => o.key))){
          tmp.push({ key: val.id, disabled: true, brand: { ...val }})
        } else {
          tmp.push({ key: val.id, brand: { ...val }})
        }
      }
      setSelectedBrand(tmp)
    }
  }, [multipleBrandData])

  useEffect(() => {
    if(multipleCategoriesData && multipleCategoriesData.length > 0){
      let tmp = []
      for(let val of multipleCategoriesData){
        if(isIn(val.id.toString(), _.map(selectedCategory, o => o.key))){
          tmp.push({ key: val.id, disabled: true, category: { categories_id: val.id, categories_name: val.name }})
        } else {
          tmp.push({ key: val.id, category: { categories_id: val.id, categories_name: val.name }})
        }
      }
      setSelectedCategory(tmp)
    }
  }, [multipleCategoriesData])

  useEffect(() => {
    if(multipleSubCategoriesData && multipleSubCategoriesData.length > 0){
      let tmp = []
      for(let val of multipleSubCategoriesData){
        if(val.sub_categories_id && isIn(val.sub_categories_id.toString(), _.map(selectedSubCategory, o => o.key))){
          tmp.push({ key: val.sub_categories_id, disabled: true, category: { ...val }})
        } else {
          tmp.push({ key: val.sub_categories_id, category: { ...val }})
        }
      }
      setSelectedSubCategory(tmp)
    }
  }, [multipleSubCategoriesData])

  useEffect(() => {
    if(multipleItemSubCategoriesData && multipleItemSubCategoriesData.length > 0){
      let tmp = []
      for(let cat of multipleItemSubCategoriesData){
        for(let sub of cat.sub_categories){
          const child = sub.item_sub_categories.map(x => {
            x["name"] = x.item_sub_categories_name;
            delete x.item_sub_categories_name;
            return { 
              key: x.item_sub_categories_id, 
              category: x, 
            }
          })
          const data = {
            key: cat.categories_id.toString()+"~"+sub.sub_categories_id.toString(),
            category: { 
              name: cat.categories_name+ " / " +sub.sub_categories_name,
            },
          }
          if(child.length){
            data["children"] = child
            tmp.push(data)
          }
        }
      }
      setSelectedItemSubCategory(tmp)
    }
  }, [multipleItemSubCategoriesData])

  useEffect(() => {
    return () => {
      resetMultipleReduxData()
      dispatch(actions.getPromoSlugSuccess({}))
      dispatch(actions.getPromoCodeApplySuccess({}))
    }
  }, [])

  const resetMultipleReduxData = () => {
    dispatch(actions.getMultipleBrandSuccess([]))
    dispatch(actions.getMultipleProductSuccess([]))
    dispatch(actions.getMultipleCategoriesSuccess([]))
    dispatch(actions.getMultipleSubCategoriesSuccess([]))
    dispatch(actions.getMultipleItemSubCategoriesSuccess([]))
  }

  const selectTypeVoucherHandler = e => {
    setTypeVoucher({
      value: e.target.value, 
      label: e.target.label
    })
  }

  /*FUNCTION FOR CHANGING KIND OF VOUCHER*/
  const discountTypeHandler = (val, index) => {
    const newDataVoucher = JSON.parse(JSON.stringify(selectedDataVoucher))
    let item = "nominal"
    if(val === "discount") item = "nominal"
    if(val === "discount_up_to") item = "percent"

    newDataVoucher[index] = {
      ...newDataVoucher[index], 
      voucher: {
        ...newDataVoucher[index].voucher, 
        kind: {
          ...newDataVoucher[index].voucher.kind,
          value: val 
        },
        [item]: {
          ...newDataVoucher[index].voucher[item],
          value: "", isValid: true, message: null
        },
        max_discount: {
          value: "", isValid: true, message: null
        }
      }
    }
    setSelectedDataVoucher(newDataVoucher)
  }
  /*FUNCTION FOR CHANGING KIND OF VOUCHER*/

  /*FUNCTION FOR REMOVE SELECTED ITEM*/
  const removeItemHandler = (key, state, setState) => {
    const newState = [...state]
    _.remove(newState, x => x.key === key)
    setState(newState)
  }

  const removeItemChildHandler = (key, state, setState) => {
    if(key.toString().includes("~")){
      const newState = [...state]
      _.remove(newState, x => x.key === key)
      setState(newState)
    }
    else{
      const newState = [...state]
      for(let [idx,val] of Object.entries(newState)){
        _.remove(val.children, x => x.key === key)
        if(val.children.length < 1){
          newState.splice(idx, 1)
        }
      }
      setState(newState)
    }
  }
  /*FUNCTION FOR REMOVE SELECTED ITEM*/

  /*FUNCTION FOR VALIDATING DATA TABLE*/
  const onValidateTable = (e, item, index) => {
    const newData = [...selectedDataVoucher]
    if(isIn(item, ["code", "quota"])){
      if(isEmpty(e.target.value || "", { ignore_whitespace: true })) {
        newData[index]['voucher'][item].isValid = false
        newData[index]['voucher'][item].message = t.validation.empty_column
      }
    }
    if(item === "nominal-percent"){
      if(newData[index]['voucher']['kind'].value === "discount"){
        if(isEmpty(e.target.value || "", { ignore_whitespace: true })) {
          newData[index]['voucher']['nominal'].isValid = false
          newData[index]['voucher']['nominal'].message = t.validation.empty_column
        }
      }
      if(newData[index]['voucher']['kind'].value === "discount_up_to"){
        if(isEmpty(e.target.value || "", { ignore_whitespace: true })) {
          newData[index]['voucher']['percent'].isValid = false
          newData[index]['voucher']['percent'].message = t.validation.empty_column
        }
      }
    }
    setSelectedDataVoucher(newData)
  }

  const onValidateTableOngkir = (e, item, index) => {
    const newData = [...selectedDataFreeShipping]
    if(isIn(item, ["code", "quota"])){
      if(isEmpty(e.target.value || "", { ignore_whitespace: true })) {
        newData[index]['voucher'][item].isValid = false
        newData[index]['voucher'][item].message = t.validation.empty_column
      }
    }
    if(item === "min_transaction" && e.target.value < 0) {
      newData[index]['voucher'][item].isValid = false
      newData[index]['voucher'][item].message = t.validation.min_transaction
    }
    setSelectedDataFreeShipping(newData)
  }
  /*FUNCTION FOR VALIDATING DATA TABLE*/

  /*FUNCTION FOR EDITING DATA TABLE*/
  const onTableChange = (e, item, index) => {
    const newData = JSON.parse(JSON.stringify(selectedDataVoucher))
    const listCode = newData.map(data => data.voucher.code.value)

    if(item === "code"){
      const re = /^[A-Z0-9]+$/
      if(re.test(e.target.value.toUpperCase())){
        const ss = e.target.selectionStart;
        const se = e.target.selectionEnd;
        const value = e.target.value.toUpperCase()
        e.target.value = e.target.value.toUpperCase();
        e.target.selectionStart = ss;
        e.target.selectionEnd = se;
        newData[index]['voucher'][item].value = value
        newData[index]['voucher'][item].isValid = true
        newData[index]['voucher'][item].message = null

        if(isIn(value, listCode)){
          newData[index]['voucher'][item].value = value
          newData[index]['voucher'][item].isValid = false
          newData[index]['voucher'][item].message = t.validation.duplicate_code
        }
      }
      if(isEmpty(e.target.value || "", { ignore_whitespace: true })) {
        newData[index]['voucher'][item].value = e.target.value
        newData[index]['voucher'][item].isValid = true
        newData[index]['voucher'][item].message = null
      }
    }
    if(item === "nominal-percent"){
      if(newData[index]['voucher']['kind'].value === "discount"){
        newData[index]['voucher']['nominal'].value = e
        newData[index]['voucher']['nominal'].isValid = true
        newData[index]['voucher']['nominal'].message = null
      }
      if(newData[index]['voucher']['kind'].value === "discount_up_to"){
        newData[index]['voucher']['percent'].value = e
        newData[index]['voucher']['percent'].isValid = true
        newData[index]['voucher']['percent'].message = null
      }
    }
    if(item !== "nominal-percent" && item !== "code"){
      newData[index]['voucher'][item].value = e
      newData[index]['voucher'][item].isValid = true
      newData[index]['voucher'][item].message = null
    }
    setSelectedDataVoucher(newData)
  }

  const onTableChangeOngkir = (e, item, index) => {
    const newData = JSON.parse(JSON.stringify(selectedDataFreeShipping))

    if(item === "code"){
      const re = /^[A-Z0-9]+$/
      if(re.test(e.target.value.toUpperCase())){
        const ss = e.target.selectionStart;
        const se = e.target.selectionEnd;
        const value = e.target.value.toUpperCase()
        e.target.value = e.target.value.toUpperCase();
        e.target.selectionStart = ss;
        e.target.selectionEnd = se;
        newData[index]['voucher'][item].value = value
        newData[index]['voucher'][item].isValid = true
        newData[index]['voucher'][item].message = null
      }
      if(isEmpty(e.target.value || "", { ignore_whitespace: true })) {
        newData[index]['voucher'][item].value = e.target.value
        newData[index]['voucher'][item].isValid = true
        newData[index]['voucher'][item].message = null
      }
    }
    if(item !== "code"){
      newData[index]['voucher'][item].value = e
      newData[index]['voucher'][item].isValid = true
      newData[index]['voucher'][item].message = null
    }
    setSelectedDataFreeShipping(newData)
  }
  /*FUNCTION FOR EDITING DATA TABLE*/

  const columnsVouchers = columnsVoucherUpdate(t).map(col => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record, index) => ({
        record,
        index: index,
        type: col.type,
        editable: col.editable,
        onBlur: e => onValidateTable(e, col.type, index),
        onChange: e => onTableChange(e, col.type, index),
        discountTypeHandler: val => discountTypeHandler(val, index),
        t: t
      })
    }
  })

  const columnsShipping = columnsOngkirUpdate(t).map(col => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record, index) => ({
        record,
        index: index,
        type: col.type,
        editable: col.editable,
        onBlur: e => onValidateTableOngkir(e, col.type, index),
        onChange: e => onTableChangeOngkir(e, col.type, index),
        t: t
      })
    }
  })

  const columnsProduct = columnsSelectedProduct(t).map(col => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record, index) => ({
        record, index: index,
        type: col.type, editable: col.editable,
        onRemove: () => removeItemHandler(record.key, selectedProduct, setSelectedProduct)
      })
    }
  })

  const columnsBrand = columnsSelectedBrand(t).map(col => {
    if(!col.editable) return col;
    return {
      ...col,
      onCell: (record, index) => ({
        record, index: index,
        type: col.type, editable: col.editable,
        onRemove: () => removeItemHandler(record.key, selectedBrand, setSelectedBrand)
      })
    }
  })

  const columnsCategory = columnsSelectedCategory(t).map(col => {
    if(!col.editable) return col;
    return {
      ...col,
      onCell: (record, index) => ({
        record, index: index,
        type: col.type, editable: col.editable,
        onRemove: () => removeItemHandler(record.key, selectedCategory, setSelectedCategory)
      })
    }
  })

  const columnsSubCategory = columnsSelectedSubCategory(t).map(col => {
    if(!col.editable) return col;
    return {
      ...col,
      onCell: (record, index) => ({
        record, index: index,
        type: col.type, editable: col.editable,
        onRemove: () => removeItemHandler(record.key, selectedSubCategory, setSelectedSubCategory)
      })
    }
  })

  const columnsItemSubCategory = columnsSelectedItemSubCategory(t).map(col => {
    if(!col.editable) return col;
    return {
      ...col,
      onCell: (record, index) => ({
        record, index: index,
        type: col.type, editable: col.editable,
        onRemove: () => removeItemChildHandler(record.key, selectedItemSubCategory, setSelectedItemSubCategory)
      })
    }
  })

  const columnsListPromoCode = columnsPromoCode(t).map(col => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record, index) => ({
        record,
        index: index,
        type: col.type,
        editable: col.editable,
        onEdit: () => onEditListPromoCode(record),
        onRemove: (promoId) => dispatch(actions.deletePromoCode(promoId, promos_slug)),
        t: t
      })
    }
  })


  /*FUNCTION FOR GET MULTIPLE DATA 'PRODUCT, BRAND, CATEGORY, SUB_CATEGORY, ITEM_SUB_CATEGORY'*/
  const setAllProduct = () => {
    setTypeVoucher({ value: ALL_KIND, label: t.basic_details.product })
  }

  const getMultipleBrand = (list_id) => {
    setTypeVoucher({ value: SPECIFIC_BRAND, label: t.basic_details.brand })
    dispatch(actions.getMultipleBrand({ list_id: list_id }))
  }

  const getMultipleProduct = (list_id) => {
    setTypeVoucher({ value: SPECIFIC_PRODUCT, label: t.basic_details.product })
    dispatch(actions.getMultipleProduct({ list_id: list_id }))
  }

  const getMultipleCategory = (list_id) => {
    setTypeVoucher({ value: CATEGORY, label: t.basic_details.category })
    dispatch(actions.getMultipleCategories({ list_id: list_id }))
  }

  const getMultipleSubCategory = (list_id) => {
    setTypeVoucher({ value: SUB_CATEGORY, label: t.basic_details.sub_category })
    dispatch(actions.getMultipleSubCategories({ list_id: list_id }))
  }

  const getMultipleItemSubCategory = (list_id) => {
    setTypeVoucher({ value: ITEM_SUB_CATEGORY, label: t.basic_details.item_sub_category })
    dispatch(actions.getMultipleItemSubCategories({ list_id: list_id }))
  }

  const getListProductHandler = (type, list_id) => {
    switch(type){
      case ALL_KIND:
        return setAllProduct()
      case SPECIFIC_BRAND:
        return getMultipleBrand(list_id)
      case SPECIFIC_PRODUCT:
        return getMultipleProduct(list_id)
      case CATEGORY:
        return getMultipleCategory(list_id)
      case SUB_CATEGORY:
        return getMultipleSubCategory(list_id)
      case ITEM_SUB_CATEGORY:
        return getMultipleItemSubCategory(list_id)
      default:
        return () => {}
    }
  }
  /*FUNCTION FOR GET MULTIPLE DATA 'PRODUCT, BRAND, CATEGORY, SUB_CATEGORY, ITEM_SUB_CATEGORY'*/

  const onShowModalHandler = (type) => {
    switch(type){
      case SPECIFIC_BRAND:
        return setShowBrandModal(true)
      case SPECIFIC_PRODUCT:
        return setShowProductModal(true)
      case CATEGORY:
        return setShowCategoryModal(true)
      case SUB_CATEGORY:
        return setShowSubCategoryModal(true)
      case ITEM_SUB_CATEGORY:
        return setShowItemSubCategoryModal(true)
      default:
        return () => {}
    }
  }

  const getSelectedProductId = () => {
    const newSelected = JSON.parse(JSON.stringify(selectedProduct))
    const listId = newSelected.map(x => x.products.products_id)
    return listId
  }

  const getSelectedBrandId = () => {
    const newSelected = JSON.parse(JSON.stringify(selectedBrand))
    const listId = newSelected.map(x => x.brand.id.toString())
    return listId
  }

  const getSelectedCategoryId = () => {
    const newSelected = JSON.parse(JSON.stringify(selectedCategory))
    const listId = newSelected.map(x => x.category.categories_id.toString())
    return listId
  }

  const getSelectedSubCategoryId = () => {
    const newSelected = JSON.parse(JSON.stringify(selectedSubCategory))
    const listId = newSelected.map(x => x.category.sub_categories_id.toString())
    return listId
  }

  const getSelectedItemSubCategoryId = () => {
    const newSelected = JSON.parse(JSON.stringify(selectedItemSubCategory))
    const listId = getSelectedKeys(newSelected).map(x => x.toString())
    return listId
  }

  const getListIdHandler = (type) => {
    switch(type){
      case SPECIFIC_BRAND:
        return getSelectedBrandId()
      case SPECIFIC_PRODUCT:
        return getSelectedProductId()
      case CATEGORY:
        return getSelectedCategoryId()
      case SUB_CATEGORY:
        return getSelectedSubCategoryId()
      case ITEM_SUB_CATEGORY:
        return getSelectedItemSubCategoryId()
      default:
        return () => {}
    }
  }

  const onEditListPromoCode = (record) => {
    if(record.voucher.kind.value === "ongkir"){
      setSelectedDataFreeShipping([record])
      setSelectedDataVoucher([])
    }
    else{
      setSelectedDataVoucher([record])
      setSelectedDataFreeShipping([])
    }
    dispatch(actions.getPromoCodeApply(record.key))
    resetMultipleReduxData()
  }

  useEffect(() => {
    setSelectedBrand([])
    setSelectedProduct([])
    setSelectedCategory([])
    setSelectedSubCategory([])
    setSelectedItemSubCategory([])
    resetMultipleReduxData()
  }, [typeVoucher])

  /*FUNCTION FORMATING TO VOUCHER*/
  const formatingVoucher = () => {
    let voucher = {}
    let promoCodeId = null, kindType = null
    const newDataVoucher = [...selectedDataVoucher]
    const newDataOngkir = [...selectedDataFreeShipping]

    if(newDataVoucher.length){
      const { code, kind, max_discount, min_transaction, nominal, percent, quota } = newDataVoucher[0].voucher
      kindType = kind.value
      promoCodeId = newDataVoucher[0].key
      const init = {
        code: code.value,
        quota: +quota.value,
        kind: kind.value,
        min_transaction: +min_transaction.value || 0,
      }
      if(kind.value === "discount"){
        const data = {
          ...init,
          nominal: +nominal.value,
          percent: null,
          max_discount: null
        }
        voucher = data
      }
      if(kind.value === "discount_up_to"){
        const data = {
          ...init,
          nominal: null,
          percent: percent.value,
          max_discount: +max_discount.value
        }
        voucher = data
      }
    }

    if(newDataOngkir.length){
      const { code, kind, min_transaction, quota } = newDataOngkir[0].voucher
      kindType = kind.value
      promoCodeId = newDataOngkir[0].key
      const init = {
        code: code.value,
        quota: +quota.value,
        kind: kind.value,
        min_transaction: +min_transaction.value || 0,
      }
      if(kind.value === "ongkir"){
        const data = {
          ...init,
          nominal: null,
          percent: null,
          max_discount: null
        }
        voucher = data
      }
    }
    return {
      voucher: voucher,
      kindType: kindType,
      promoCodeId: promoCodeId
    }
  }
  /*FUNCTION FORMATING TO VOUCHER*/

  const onSubmitHandler = e => {
    e.preventDefault()
    let tableIsValid = []
    let tableOngkirIsValid = []
    if((_.isEmpty(formatingVoucher().voucher)) || (formatingVoucher().promoCodeId == null)){
      formErrorMessage(t.basic_details.promo_code_list)
      return
    }
    if(selectedDataVoucher && selectedDataVoucher.length > 0){
      for(let i = 0; i < selectedDataVoucher.length; i++){
        tableIsValid.push(formTableVoucherIsValid(selectedDataVoucher, setSelectedDataVoucher, i, t))
      }
    }
    if(selectedDataFreeShipping && selectedDataFreeShipping.length > 0){
      for(let i = 0; i < selectedDataFreeShipping.length; i++){
        tableOngkirIsValid.push(formTableOngkirIsValid(selectedDataFreeShipping, setSelectedDataFreeShipping, i, t))
      }
    }
    if(
      formLengthVoucherIsValid(countVoucherLength, setCountVoucherLength, typeVoucher.value, t) &&
      !isIn("false", tableIsValid) && !isIn("false", tableOngkirIsValid)
    ){
      const data = {
        applicable_promo: {
          list_id: getListIdHandler(typeVoucher.value),
          kind: typeVoucher.value
        },
        voucher: formatingVoucher().voucher
      }
      setLoading(true)
      const newParams = { slug: query.slug, ...params }
      axios.put(`/promo-codes/update/${formatingVoucher().promoCodeId}`, data, jsonHeaderHandler())
        .then(res => {
          setLoading(false)
          resetMultipleReduxData()
          setTypeVoucher(initialTypeVoucher)
          if(res.status == 404){
            formErrorMessage(res.data.detail)
            dispatch(actions.getSlugPromo(newParams))
          }
          else{
            resNotification("success", "Success", res.data.detail)
            dispatch(actions.getSlugPromo(newParams))
          }
        })
        .catch(err => {
          setLoading(false)
          const errDetail = err.response.data.detail
          if(errDetail == signature_exp){
            resetAllData()
            resetMultipleReduxData()
            resNotification("success", "Success", t.success_update)
            dispatch(actions.getSlugPromo(newParams))
          }
          if(typeof errDetail === "string" && errDetail !== signature_exp){
            formErrorMessage(errDetail)
          }
          if(typeof errDetail === "object"){
            let state = {}
            if(formatingVoucher().kindType === "ongkir") state = [...selectedDataFreeShipping]
            else state = [...selectedDataVoucher]

            const stateCountVoucherLength = JSON.parse(JSON.stringify(countVoucherLength))
            errDetail.map(data => {
              const key = data.loc[data.loc.length - 1];
              if(isIn(key, ["voucher", "list_id"])){
                if(stateCountVoucherLength[key]){
                  stateCountVoucherLength[key].value = stateCountVoucherLength[key].value
                  stateCountVoucherLength[key].isValid = false
                  stateCountVoucherLength[key].message = data.msg
                }
                if(key === "list_id"){
                  stateCountVoucherLength["selected"].value = stateCountVoucherLength["selected"].value
                  stateCountVoucherLength["selected"].isValid = false
                  stateCountVoucherLength["selected"].message = data.msg
                }
                setCountVoucherLength(stateCountVoucherLength)
              }
              if(isIn(key, ["code", "quota", "min_transaction", "nominal", "percent", "max_discount"])){
                if(state[0]["voucher"][key]){
                  state[0]["voucher"][key].value = state[0]["voucher"][key].value
                  state[0]["voucher"][key].isValid = false
                  state[0]["voucher"][key].message = data.msg
                }
              }
            })

            if(formatingVoucher().kindType === "ongkir") setSelectedDataFreeShipping(state)
            else setSelectedDataVoucher(state)
          }
        })
    }
  }

  useEffect(() => {
    const combineSelected = [...selectedBrand, ...selectedProduct, ...selectedCategory, ...selectedSubCategory, ...selectedItemSubCategory]
    const data = {
      ...countVoucherLength,
      selected: {
        value: combineSelected.length,
        isValid: true, message: null
      }
    }
    setCountVoucherLength(data)
  }, [selectedBrand, selectedProduct, selectedCategory, selectedSubCategory, selectedItemSubCategory])

  return (
    <>
      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">{t.basic_details.title}</h5>
        </Card.Body>
        <Card.Body className="p-3">
          <Form layout="vertical">

            <Form.Item required label={t.basic_details.select_promo}>
              <Select disabled
                value={promos_id}
                placeholder={t.basic_details.select_promo}
              >
                <Select.Option value={promos_id}>{promos_name}</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label={t.basic_detailspromo_code_list}>
              <Table 
                pagination={false}
                scroll={{ x: 1000 }}
                columns={columnsListPromoCode}
                components={listCodeComponets}
                dataSource={[...dataVoucher, ...dataFreeShipping]}
              />
            </Form.Item>

            {(typeVoucher.value && typeVoucher.label) && (
              <>
                <Form.Item label={t.basic_details.voucher_type} required>
                  <Radio.Group value={typeVoucher.value} onChange={selectTypeVoucherHandler}>
                    <Radio.Button value={ALL_KIND} 
                      label={t.basic_details.product} className="voucher-radio-button-wrapper noselect"
                    >
                      <i className="far fa-lg fa-boxes-alt mr-1" /> {t.basic_details.all_product}
                    </Radio.Button>
                    <Radio.Button value={SPECIFIC_PRODUCT} 
                      label={t.basic_details.product} className="voucher-radio-button-wrapper noselect"
                    >
                      <i className="far fa-lg fa-box-full mr-1" /> {t.basic_details.specific_product}
                    </Radio.Button>
                    <Radio.Button value={SPECIFIC_BRAND} 
                      label={t.basic_details.brand} className="voucher-radio-button-wrapper noselect"
                    >
                      <i className="far fa-lg fa-layer-group mr-1" /> {t.basic_details.specific_brand}
                    </Radio.Button>
                    <br className="d-none d-md-block" />
                    <Radio.Button value={CATEGORY} 
                      label={t.basic_details.category} className="voucher-radio-button-wrapper noselect"
                    >
                      <i className="far fa-lg fa-sitemap mr-1" /> {t.basic_details.category}
                    </Radio.Button>
                    <Radio.Button value={SUB_CATEGORY} 
                      label={t.basic_details.sub_category} className="voucher-radio-button-wrapper noselect"
                    >
                      <i className="far fa-lg fa-folder-tree mr-1" /> {t.basic_details.sub_category}
                    </Radio.Button>
                    <Radio.Button value={ITEM_SUB_CATEGORY} 
                      label={t.basic_details.item_sub_category} className="voucher-radio-button-wrapper noselect"
                    >
                      <i className="far fa-lg fa-folder mr-1" /> {t.basic_details.item_sub_category}
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item 
                  required 
                  className="mb-0"
                  label={locale === "en" ? 
                          `${t.basic_details.applicable} ${typeVoucher.label}` : `${typeVoucher.label} ${t.basic_details.applicable}`
                        } 
                >
                  {typeVoucher.value === ALL_KIND ? 
                    <p className="mb-0 mt-n3 noselect">{t.basic_details.all_product}</p> : 
                    <>
                      <Button with="dashed" type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={typeVoucher.value === ALL_KIND ? () => {} : () => onShowModalHandler(typeVoucher.value)}
                      >
                        {t.basic_details.add} {typeVoucher.label}
                      </Button>
                      <ErrorMessage item={selected} />
                    </>
                  }
                </Form.Item>
              </>
            )}

            {selectedProduct.length > 0 && typeVoucher.value === SPECIFIC_PRODUCT && (
              <Table {...tableProps} columns={columnsProduct} dataSource={selectedProduct} />
            )}

            {selectedBrand.length > 0 && typeVoucher.value === SPECIFIC_BRAND && (
              <Table {...tableProps} columns={columnsBrand} dataSource={selectedBrand} />
            )}

            {selectedCategory.length > 0 && typeVoucher.value === CATEGORY && (
              <Table {...tableProps} columns={columnsCategory} dataSource={selectedCategory} />
            )}

            {selectedSubCategory.length > 0 && typeVoucher.value === SUB_CATEGORY && (
              <Table {...tableProps} columns={columnsSubCategory} dataSource={selectedSubCategory} />
            )}

            {selectedItemSubCategory.length > 0 && typeVoucher.value === ITEM_SUB_CATEGORY && (
              <Table {...tableProps} scroll={{ x:700, y:300 }} 
                expandable={{ defaultExpandAllRows: true }} columns={columnsItemSubCategory} dataSource={selectedItemSubCategory} 
              />
            )}

          </Form>
        </Card.Body>
      </Card>

      {((typeVoucher.value && typeVoucher.label) && ((selectedDataVoucher.length > 0) || (selectedDataFreeShipping.length > 0))) && (
        <>
          <Card className="border-0 shadow-sm card-add-product">
            <Card.Body className="p-3 border-bottom">
              <h5 className="mb-0 fs-16-s">{t.bonus_settings.title}</h5>
            </Card.Body>

            <Card.Body className="p-3">
              {selectedDataVoucher.length > 0 && (
                <>
                  <p className="fs-15 mb-3 w-100 fw-500">
                    {t.bonus_settings.discount_voucher}
                  </p>
                  <Table
                    pagination={false}
                    scroll={{ x: 1000 }}
                    components={components}
                    dataSource={selectedDataVoucher}
                    columns={columnsVouchers}
                  />
                </>
              )}

              {selectedDataFreeShipping.length > 0 && (
                <>
                  <p className="fs-15 my-3 w-100 fw-500">
                    {t.bonus_settings.free_shipping_voucher}
                  </p>
                  <Table
                    pagination={false}
                    components={components}
                    dataSource={selectedDataFreeShipping}
                    columns={columnsShipping}
                  />
                </>
              )}
            </Card.Body>
          </Card>

          <Space>
            <Button className="btn-tridatu" onClick={onSubmitHandler} style={{ width: 80 }} disabled={loading}>
              {loading ? <LoadingOutlined /> : t.save}
            </Button>
            <Link href="/admin/promo">
              <Button>{t.cancel}</Button>
            </Link>
          </Space>
        </>
      )}

      <ProductVoucherModal
        t={t}
        typeVoucher={typeVoucher}
        visible={showProductModal}
        onClose={() => setShowProductModal(false)}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />

      <BrandVoucherModal
        t={t}
        typeVoucher={typeVoucher}
        visible={showBrandModal}
        onClose={() => setShowBrandModal(false)}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
      />

      <CategoryVoucherModal
        t={t}
        typeVoucher={typeVoucher}
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <SubCategoryVoucherModal
        t={t}
        typeVoucher={typeVoucher}
        visible={showSubCategoryModal}
        onClose={() => setShowSubCategoryModal(false)}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
      />

      <ItemSubCategoryVoucherModal
        t={t}
        typeVoucher={typeVoucher}
        visible={showItemSubCategoryModal}
        onClose={() => setShowItemSubCategoryModal(false)}
        selectedItemSubCategory={selectedItemSubCategory}
        setSelectedItemSubCategory={setSelectedItemSubCategory}
      />


      <style jsx>{AddStyleAdmin}</style>
      <style jsx>{`
        :global(.voucher-radio-button-wrapper, .voucher-radio-button-wrapper:first-child, .ant-radio-button-wrapper:last-child){
          margin-right: 8px;
          margin-bottom: 8px;
          border-radius: .25rem;
          border-left-width: 1px!important;
          height: auto;
          padding: 5px 15px;
        }
        :global(.ant-radio-button-wrapper:last-child){
          margin-right: 0px;
        }
        :global(.voucher-radio-button-wrapper:hover){
          color: rgba(0, 0, 0, 0.85);
          box-shadow: rgb(49 53 59 / 16%) 0px 2px 6px 0px;
        }
        :global(
          .voucher-radio-button-wrapper:not(:first-child)::before, 
          .voucher-radio-button-wrapper.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before
        ){
          width: 0px;
        }
        :global(.voucher-radio-button-wrapper.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):focus-within){
          box-shadow: 0 0 0 3px #ff434412;
        }
        :global(.voucher-radio-button-wrapper.ant-radio-button-wrapper-checked:not([class*=' ant-radio-button-wrapper-disabled']).ant-radio-button-wrapper:first-child) {
          border-right-color: #d63031;
        }
        :global(.voucher-radio-button-wrapper.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)){
          color: #d63031;
          background: #d630310a;
          border-color: #d63031;
        }
        :global(.voucher-radio-button-wrapper.ant-radio-button-wrapper-disabled:hover){
          color: rgba(0, 0, 0, 0.25);
          box-shadow: unset;
        }
      `}</style>
    </>
  )
}


UpdateVoucher.getInitialProps = async ctx => {
  const { slug } = ctx.query
  ctx.store.dispatch(actions.getPromoSlugStart())
  try{
    const res = await axios.get(`/promos/${slug}`, { params: params }, jsonHeaderHandler())
    if(res.status == 404){
      process.browser
        ? Router.replace("/admin/promo", "/admin/promo") //Redirec from Client Side
        : ctx.res.writeHead(302, { Location: "/admin/promo" }); //Redirec from Server Side
      !process.browser && ctx.res.end()
    } else {
      ctx.store.dispatch(actions.getPromoSlugSuccess(res.data))
    }
  }
  catch (err) {
    const res = await axios.get(`/promos/${slug}`, { params: params })
    if(res.status == 404){
      process.browser
        ? Router.replace("/admin/promo", "/admin/promo") //Redirec from Client Side
        : ctx.res.writeHead(302, { Location: "/admin/promo" }); //Redirec from Server Side
      !process.browser && ctx.res.end()
    } else {
      ctx.store.dispatch(actions.getPromoSlugSuccess(res.data))
    }
  }
}

export default withAuth(UpdateVoucher)
