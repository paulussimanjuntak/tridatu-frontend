import { useState, useEffect } from 'react'
import { Table, Input, Form, InputNumber, Row, Col, Tooltip } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'

import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'
import ButtonColor from "antd-button-color"
import isIn from 'validator/lib/isIn'
import isEmpty from 'validator/lib/isEmpty'

import makeid from 'lib/makeid'
import getIndex from 'lib/getIndex'
import EditableCell from 'components/Admin/Variant/Cell'
import { formItemLayout, initialColumn, createNewArr } from 'data/productsAdmin'

const emptyMessage = "Variasi tidak boleh kosong"
const emptyColumnMessage = "Kolom tidak boleh kosong"
const duplicateMessage = "Pilihan variasi harus berbeda."
const stockMessage = "Stok tidak boleh kurang dari 0."
const initialValue = { value: "", isValid: true, message: null }
const additional = { price: initialValue, stock: initialValue, code: initialValue } 

/*
 * TODO:
 * Remove variant ✅
 * Update all table value ✅
 * Remove variant group ✅
 */

const components = { body: { cell: EditableCell } };

const TableVariant = () => {
  const [count, setCount] = useState(0)
  const [columns, setColumns] = useState(initialColumn)
  const [dataSource, setDataSource] = useState([])
  const [vaOption, setVaOption] = useState({ va1Option: [], va2Option: [], va1Total: 0, va2Total: 0 })
  const [isActiveVariation, setIsActiveVariation] = useState({ active: false, countVariation: 0 })
  const [infoVariant, setInfoVariant] = useState(additional)
  const [isSetAll, setIsSetAll] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const { countVariation } = isActiveVariation
  const { va1Option, va2Option, va1Total, va2Total } = vaOption

  const addVariant = (variant) => {
    setIsSetAll(false)
    const dataLength = dataSource.length
    const va2Length = va2Option.length
    if(variant == 1){
      const data = {
        ...vaOption,
        va1Option: [
          ...va1Option, {
            key: `va${variant}_option${dataLength+1+count}_${makeid(10)}`, 
            va1_option: { ...initialValue, isValid: false }, 
            ...additional
          }
        ],
        va1Total: va1Total + 1
      }
      setVaOption(data)
    }
    if(variant == 2){
      const data = {
        ...vaOption,
        va2Option: [
          ...va2Option, {
            key: `va${variant}_option${va2Length}_${makeid(10)}`, 
            va2_option: { ...initialValue, isValid: false }, 
            ...additional
          }
        ],
        va2Total: va2Total + 1
      }
      setVaOption(data)
    }
  }

  const addColumVariantHandler = (variant) => {
    const copyColumns = columns.splice(0)
    let data = {
      title: `Nama`,
      dataIndex: `va${variant}_option`,
      key: `va${variant}_option`,
      fixed: 'left',
      width: 152,
      align: "center",
      isValid: true,
      message: null,
      render: (value) => value,
    }
    if(variant == 2){
      copyColumns[0] = {
        ...copyColumns[0],
        fixed: 'left',
        width: 150,
        render: (value, row) => {
          return {
            children: value,
            props: { rowSpan: row.rowSpan }
          }
        } // render
      }
    }
    setColumns(copyColumns)
    copyColumns.splice(variant-1, 0, data)
  }

  const activeVariantHandler = (variant) => {
    setIsActiveVariation({ ...isActiveVariation, active: true, countVariation: countVariation + 1 })
    addColumVariantHandler(variant)
    addVariant(variant)
    setIsSetAll(false)
  }

  const onVariantHeadChange = valKey => e => {
    const value = e.target.value
    const idx = getIndex(valKey, columns, 'key')
    const listVariantHeads = []
    for(let i = 0; i < countVariation; i++){
      listVariantHeads.push(columns[i].title)
    }

    let newColumns = [...columns]
    if(isEmpty(value || "", { ignore_whitespace: true })){
      newColumns[idx].title = value || "Nama"
      newColumns[idx].isValid = false
      newColumns[idx].message = emptyMessage
      setColumns(newColumns)
    } else {
      newColumns[idx].title = value || "Nama"
      newColumns[idx].isValid = true
      newColumns[idx].message = null
      setColumns(newColumns)
    }
    if(value && isIn(value, listVariantHeads)){
      newColumns[idx].title = value || "Nama"
      newColumns[idx].isValid = false
      newColumns[idx].message = duplicateMessage
      setColumns(newColumns)
    }
  }

  const onValidateVariantHeadCheck = valKey => e => {
    const value = e.target.value
    const idx = getIndex(valKey, columns, 'key')

    let newColumns = [...columns]
    if(isEmpty(value || "", { ignore_whitespace: true })){
      newColumns[idx].title = value || "Nama"
      newColumns[idx].isValid = false
      newColumns[idx].message = emptyMessage
      setColumns(newColumns)
    }
  }

  const onVariantOptionChange = (idx, variant) => e => {
    const value = e.target.value
    const listVariants = vaOption[`va${variant}Option`].map(data => data[`va${variant}_option`].value)

    let newVaOption = [...vaOption[`va${variant}Option`]]
    if(isEmpty(value || "", { ignore_whitespace: true })){
      newVaOption[idx][`va${variant}_option`].value = value
      newVaOption[idx][`va${variant}_option`].isValid = false
      newVaOption[idx][`va${variant}_option`].message = emptyMessage 
      setVaOption({ ...vaOption, [`va${variant}Option`]: newVaOption })
    } else {
      newVaOption[idx][`va${variant}_option`].value = value
      newVaOption[idx][`va${variant}_option`].isValid = true
      newVaOption[idx][`va${variant}_option`].message = null
      setVaOption({ ...vaOption, [`va${variant}Option`]: newVaOption })
    }
    if(value && isIn(value, listVariants)){
      newVaOption[idx][`va${variant}_option`].value = value
      newVaOption[idx][`va${variant}_option`].isValid = false
      newVaOption[idx][`va${variant}_option`].message = duplicateMessage
      setVaOption({ ...vaOption, [`va${variant}Option`]: newVaOption })
    }
  }

  const onValidateVariantCheck = (idx, variant) => e => {
    const value = e.target.value

    let newVaOption = [...vaOption[`va${variant}Option`]]
    if(isEmpty(value || "", { ignore_whitespace: true })){
      newVaOption[idx][`va${variant}_option`].value = value
      newVaOption[idx][`va${variant}_option`].isValid = false
      newVaOption[idx][`va${variant}_option`].message = emptyMessage 
      setVaOption({ ...vaOption, [`va${variant}Option`]: newVaOption })
    }
  }

  const deleteGroupVariantsHandler = (variant) => {
    setIsActiveVariation({ ...isActiveVariation, active: countVariation == 1 ? false : true,  countVariation: countVariation - 1 })
    if(countVariation == 1) setCount(0)

    let oldVa2 = [...vaOption.va2Option]
    let oldColumns = [...columns]; // make a separate copy of the array
    oldColumns.splice(variant-1, 1);
    setColumns(oldColumns);

    if(variant == 1 && va2Total > 0){
      oldVa2.map(obj => {
        obj[`va1_option`] = obj[`va2_option`]
        delete obj[`va2_option`]
        return obj
      })

      oldColumns[0] = {
        ...oldColumns[0],
        dataIndex: `va${variant}_option`,
        key: `va${variant}_option`,
      }

      const data = {
        ...vaOption, 
        va1Option: oldVa2, 
        va2Option: [],
        va1Total: va2Total,
        va2Total: 0,
      }

      setVaOption(data);
      setColumns(oldColumns);
    }

    if(variant == 1 && va2Total == 0){
      setVaOption({ ...vaOption, va1Option: [], va1Total: 0, va2Total: 0 })
    }

    if(variant == 2){
      oldColumns.map(obj => {
        delete obj.render
        return obj
      })
      setVaOption({ ...vaOption, va2Option: [], va2Total: 0 });
      setColumns(oldColumns);
    }
  }

  const deleteVariantHandler = (variant, index) => {
    setIsDeleting(true)
    if(countVariation == 1 && variant == 1) {
      setDataSource(dataSource.filter((_, i) => i !== index))
    }
    if(countVariation == 2 && variant == 1) {
      setDataSource(dataSource.filter(data => data.va1_key !== index))
    }
    if(countVariation == 2 && variant == 2) {
      setDataSource(dataSource.filter(data => data.va2_key !== index))
    }
    const data = {
      ...vaOption,
      [`va${variant}Option`]: vaOption[`va${variant}Option`].filter((_, i) => i !== index),
      [`va${variant}Total`]: vaOption[`va${variant}Total`] - 1
    }
    setVaOption(data)
  }

  const infoVariantChange = (e, item) => {
    const name = !item && e.target.name;
    const value = !item && e.target.value;

    if(item){
      const data = {
        ...infoVariant,
        [item]: { ...initialValue, value: e }
      }
      setInfoVariant(data)
    }
    else{
      const data = {
        ...infoVariant,
        [name]: { ...initialValue, value: value }
      }
      setInfoVariant(data)
    }
  }


  const setInfoVariantHandler = () => {
    setIsSetAll(true)
    isDeleting && setIsDeleting(false)

    if(countVariation == 2){
      let oldVa2 = [...va2Option]
      const { price, stock, code } = infoVariant

      oldVa2.map(obj => {
        if(price.value) obj.price = price
        if(stock.value) obj.stock = stock
        if(code.value) obj.code = code
        return obj
      })
      setVaOption({ ...vaOption, va2Option: oldVa2 })
    }
  }

  useEffect(() => {
    let variants = []
    const copyDataSource = [...dataSource]

    for(let [key1, val1] of Object.entries(va1Option)){
      let variant_tmp = []
      if(vaOption.va2Option.length){
        for(let [key2, val2] of Object.entries(va2Option)){
          const initialData = {
            key: val1.key+val2.key,
            va1_key: +key1,
            va2_key: +key2,
            va1_option: val1.va1_option.value ? val1.va1_option.value : `Pilihan ${+key1+1}`,
            va2_option: val2.va2_option.value ? val2.va2_option.value : `Pilihan ${+key2+1}`,
          }
          if(isDeleting || isSetAll){
            variant_tmp.push({
              ...initialData,
            })
          } else {
            if(!isSetAll){
              variant_tmp.push({
                ...initialData,
                price: { ...initialValue, value: val2.price.value },
                stock: { ...initialValue, value: val2.stock.value },
                code: { ...initialValue, value: val2.code.value },
              })
            }
          }
        }
      }
      else{
        const initialData = {
          key: val1.key,
          va1_option: val1.va1_option.value ? val1.va1_option.value : `Pilihan ${+key1+1}`,
        }
        if(isSetAll && !isDeleting){
          const { price, stock, code } = infoVariant
          variant_tmp.push({
            ...initialData,
            price: { ...initialValue, value: price.value ? price.value : copyDataSource[key1].price.value },
            stock: { ...initialValue, value: stock.value ? stock.value : copyDataSource[key1].stock.value },
            code: { ...initialValue, value: code.value ? code.value : copyDataSource[key1].code.value },
          })
        }
        if(isDeleting){
          variant_tmp.push({
            ...initialData,
          })
        } else {
          if(!isSetAll){
            variant_tmp.push({
              ...initialData,
              price: { ...initialValue, value: val1.price.value },
              stock: { ...initialValue, value: val1.stock.value },
              code: { ...initialValue, value: val1.code.value },
            })
          }
        }
      }
      for(let item of variant_tmp){
        variants.push(item)
      }
    }

    if(countVariation == 2 && isSetAll){
      const tmpVar = copyDataSource.map(data => data.key)
      const { price, stock, code } = infoVariant

      for(var i = 0; i < variants.length; i++){
        const dataPrice = copyDataSource[getIndex(tmpVar[i], copyDataSource, "key")].price
        const dataStock = copyDataSource[getIndex(tmpVar[i], copyDataSource, "key")].stock
        const dataCode = copyDataSource[getIndex(tmpVar[i], copyDataSource, "key")].code

        variants[i] = {
          ...variants[i],
          price: { ...initialValue, value: price.value ? price.value : dataPrice.value },
          stock: { ...initialValue, value: stock.value ? stock.value : dataStock.value },
          code: { ...initialValue, value: code.value ? code.value : dataCode.value }
        }
      }
      setIsSetAll(false)
    }

    if(isDeleting){
      isSetAll && setIsSetAll(false)
      const tmpVar = copyDataSource.map(data => data.key)
      const tmpDataSource = variants.map(data => data.key)

      for(var i = 0; i < variants.length; i++){
        for(let val of tmpVar){
          if(variants[i].key === val){
            for(let prop of ["price", "stock", "code"]){
              variants[i][prop] = {
                value:   copyDataSource[getIndex(val, copyDataSource, "key")][prop].value,
                isValid: copyDataSource[getIndex(val, copyDataSource, "key")][prop].isValid,
                message: copyDataSource[getIndex(val, copyDataSource, "key")][prop].message,
              }
            }
          }
        }
        for(let val of tmpDataSource.filter(x => !tmpVar.includes(x))){
          if(variants[i].key === val){
            for(let prop of ["price", "stock", "code"]){
              variants[i][prop] = initialValue
            }
          }
        }
      }
      setIsDeleting(false)
    }

    if(!isSetAll && !isDeleting){
      const tmpVar = copyDataSource.map(data => data.key)
      const tmpDataSource = variants.map(data => data.key)

      for(var i = 0; i < variants.length; i++){
        for(let val of tmpVar){
          if(variants[i].key === val){
            for(let prop of ["price", "stock", "code"]){
              variants[i][prop] = {
                value: copyDataSource[getIndex(val, copyDataSource, "key")][prop].value,
                isValid: copyDataSource[getIndex(val, copyDataSource, "key")][prop].isValid,
                message: copyDataSource[getIndex(val, copyDataSource, "key")][prop].message,
              }
            }
          }
        }
        for(let val of tmpDataSource.filter(x => !tmpVar.includes(x))){
          if(variants[i].key === val){
            for(let prop of ["price", "stock", "code"]){
              variants[i][prop] = initialValue
            }
          }
        }
      }
    }

    setDataSource(variants)
  },[vaOption, isDeleting, isSetAll])

  /*
   * TODO: 
   * add onChange in every table columns
   * set all when error is still showing
   */
  const onTableChange = (e, item, index) => {
    const newData = [...dataSource]

    const name = !item && e.target.name;
    const value = !item && e.target.value;

    if(item) {
      newData[index][item].value = e
      newData[index][item].isValid = true
      newData[index][item].message = null
    }
    else {
      newData[index][name].value = value
      newData[index][name].isValid = true
      newData[index][name].message = null
    }
    if(item && e < 0) {
      newData[index][item].value = e
      newData[index][item].isValid = false
      newData[index][item].message = stockMessage
    }
    if(item && e !== 0 && isEmpty(e ? e.toString() : "", { ignore_whitespace: true })) {
      newData[index][item].value = e
      newData[index][item].isValid = false
      newData[index][item].message = emptyColumnMessage
    }
    setDataSource(newData)
  }

  const onValidateTableVariantCheck = (e, item, index) => {
    const newData = [...dataSource]

    if(item && isEmpty(e.target.value || "", { ignore_whitespace: true })) {
      newData[index][item].isValid = false
      newData[index][item].message = emptyColumnMessage
    }
    setDataSource(newData)
  }

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;

    return {
      ...col,
      onCell: (record, index) => ({
        record,
        index: index,
        title: col.title,
        editable: col.editable,
        dataIndex: col.dataIndex,
        inputType: col.inputType,
        onChange: e => onTableChange(e, col.inputType !== "code" && col.inputType, index),
        onBlur: e => onValidateTableVariantCheck(e, col.inputType !== "code" && col.inputType, index),
        onFocus: () => setIsSetAll(false)
      }),
    };
  });

  return(
    <>
      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3">

          {[...Array(countVariation)].map((_, i) => (
            <React.Fragment key={i}>
            <Card.Header className="bg-light border-0 pb-0 text-right">
              <span className="hover-pointer text-dark" onClick={() => deleteGroupVariantsHandler(i+1)}>
                <i className="far fa-times" />
              </span>
            </Card.Header>
            <Card.Body className="px-3 pb-3 pt-0 bg-light">
              <p className="fs-14 mb-2">Variasi {i+1}</p>
              <Form layout="vertical" {...formItemLayout} name="head_title">
                <Form.Item 
                  className="mb-3"
                  label="Nama"
                  name={`va${i+1}_option`}
                  validateStatus={!columns[i].isValid && columns[i].message && "error"}
                >
                  <Media className="align-items-center">
                    <Tooltip 
                      color="red"
                      placement="topLeft"
                      visible={!columns[i].isValid && columns[i].message}
                      title={<small className="fs-10">{columns[i].message}</small>}
                      autoAdjustOverflow
                      overlayClassName="variant-input-tooltip"
                    >
                      <Input 
                        name={`va${i+1}_name`}
                        className="h-35"
                        value={columns[i].title.split(" ")[0] === "Nama" ? "" : columns[i].title} 
                        placeholder={
                          i == 0 ? "Masukkan Nama Variasi, contoh: Warna, dll." : 
                          i == 1 ? "Masukkan Nama Variasi, contoh: Ukuran, dll." : ""
                        } 
                        onBlur={onValidateVariantHeadCheck(`va${i+1}_option`)}
                        onChange={onVariantHeadChange(`va${i+1}_option`)}
                        onFocus={() => setIsSetAll(false)}
                      />
                    </Tooltip>
                    <Media.Body>
                      <div style={{ width: 22 }} />
                    </Media.Body>
                  </Media>
                </Form.Item>
              </Form>

              <Form layout="vertical" {...formItemLayout} name={`variants_${i+1}`}>
                {/* VARIANT 1 */}
                {i == 0 && [...Array(va1Total)].map((_,idx) => (
                  <Form.Item 
                    key={idx}
                    label={idx === 0 && 'Pilihan'} 
                    className="my-2 w-100" 
                    name={`variants_${idx+1}`} 
                    validateStatus={!va1Option[idx].va1_option.isValid && va1Option[idx].va1_option.message && "error"}
                  >
                    <Media className="align-items-center">
                      <Tooltip 
                        color="red"
                        placement="topLeft"
                        visible={!va1Option[idx].va1_option.isValid && va1Option[idx].va1_option.message}
                        title={<small className="fs-10">{va1Option[idx].va1_option.message}</small>}
                        autoAdjustOverflow
                        overlayClassName="variant-input-tooltip"
                      >
                        <Input 
                          className="h-35" 
                          name="va1_option"
                          value={va1Option[idx].va1_option.value} 
                          onChange={onVariantOptionChange(idx, i+1)}
                          onBlur={onValidateVariantCheck(idx, i+1)}
                          onFocus={() => setIsSetAll(false)}
                          placeholder={
                            i == 0 ? "Masukkan Pilihan Variasi, contoh: Merah, dll." : 
                            i == 1 ? "Masukkan Pilihan Variasi, contoh: S, M, dll." : ""
                          } 
                        />
                      </Tooltip>
                      <Media.Body> 
                        {idx == 0 && <div style={{ width: 22 }} />} {idx == 1 && <div style={{ width: 22 }} />}
                        {va1Total > 1 ? (
                          <i className="fal fa-trash-alt ml-2 hover-pointer text-secondary" onClick={() => deleteVariantHandler(i+1, idx)} />
                        ) : null}
                      </Media.Body> 
                    </Media>
                  </Form.Item>
                ))}

                {/* VARIANT 2 */}
                {i == 1 && [...Array(va2Total)].map((_,idx) => (
                  <Form.Item 
                    key={idx}
                    label={idx === 0 && 'Pilihan'} 
                    className="my-2 w-100" 
                    name={`variants_${idx+1}`} 
                    validateStatus={!va2Option[idx].va2_option.isValid && va2Option[idx].va2_option.message && "error"}
                  >
                    <Media className="align-items-center">
                      <Tooltip 
                        color="red"
                        placement="topLeft"
                        visible={!va2Option[idx].va2_option.isValid && va2Option[idx].va2_option.message}
                        title={<small className="fs-10">{va2Option[idx].va2_option.message}</small>}
                        autoAdjustOverflow
                        overlayClassName="variant-input-tooltip"
                      >
                        <Input 
                          className="h-35" 
                          name="va2_option"
                          value={va2Option[idx].va2_option.value} 
                          onChange={onVariantOptionChange(idx, i+1)}
                          onBlur={onValidateVariantCheck(idx, i+1)}
                          placeholder={
                            i == 0 ? "Masukkan Pilihan Variasi, contoh: Merah, dll." : 
                            i == 1 ? "Masukkan Pilihan Variasi, contoh: S, M, dll." : ""
                          }
                        />
                      </Tooltip>
                      <Media.Body> 
                        {idx == 0 && <div style={{ width: 22 }} />} {idx == 1 && <div style={{ width: 22 }} />}
                        {va2Total > 1 ? (
                          <i className="fal fa-trash-alt ml-2 hover-pointer text-secondary" onClick={() => deleteVariantHandler(i+1, idx)} />
                        ) : null}
                      </Media.Body>
                    </Media>
                  </Form.Item>
                ))}

                {i == 0 && va1Total < 20 && (
                  <Form.Item className="my-1">
                    <Media className="align-items-center">
                      <ButtonColor 
                        block with="dashed" 
                        type="primary" 
                        className="h-35" 
                        icon={<PlusCircleOutlined />} 
                        onClick={() => addVariant(i+1)}
                      >
                        Tambahkan Pilihan ({va1Total+1}/20)
                      </ButtonColor>
                      <Media.Body> <div style={{ width: 22 }} /> </Media.Body>
                    </Media>
                  </Form.Item>
                )}

                {i == 1 && va2Total < 20 && (
                  <Form.Item className="my-1">
                    <Media className="align-items-center">
                      <ButtonColor 
                        block 
                        with="dashed" 
                        type="primary" 
                        className="h-35" 
                        icon={<PlusCircleOutlined />} 
                        onClick={() => addVariant(i+1)}
                      >
                        Tambahkan Pilihan ({va2Total+1}/20)
                      </ButtonColor>
                      <Media.Body> <div style={{ width: 22 }} /> </Media.Body>
                    </Media>
                  </Form.Item>
                )}

              </Form>

            </Card.Body>
            </React.Fragment>
          ))}

          {isActiveVariation.active && (
            <>
              <Card.Body className="p-3">
                <Form layout="vertical">
                  <Form.Item className="mb-0" label="Informasi Variasi" >
                    <Row gutter={[8, 8]}>
                      <Col xs={24} sm={24} md={17} lg={18} xl={18}>
                        <Input.Group compact className="info-variasi-input">
                          <div className="ant-input-group-wrapper" style={{ width: 'calc(100%/3)' }}>
                            <div className="ant-input-wrapper ant-input-group" style={{ zIndex: 1 }}>
                              <span className="ant-input-group-addon noselect">Rp</span>
                              <InputNumber
                                name="price"
                                placeholder="Harga"
                                value={infoVariant.price.value}
                                onChange={e => infoVariantChange(e, "price")}
                                className="w-100 bor-left-rad-0 bor-right-rad-0 h-33-custom-input h-35"
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                parser={value => value.replace(/\Rp\s?|(\.*)/g, '')}
                                onFocus={() => setIsSetAll(false)}
                              />
                            </div>
                          </div>
                          <InputNumber 
                            min={0} 
                            name="stock"
                            className="h-35" 
                            placeholder="Stok" 
                            value={infoVariant.stock.value}
                            onChange={e => infoVariantChange(e, "stock")}
                            onFocus={() => setIsSetAll(false)}
                            style={{ width: 'calc(100%/3)' }} 
                          />
                          <Input 
                            name="code"
                            className="h-35" 
                            placeholder="Kode Variasi" 
                            value={infoVariant.code.value}
                            onChange={e => infoVariantChange(e)}
                            onFocus={() => setIsSetAll(false)}
                            style={{ width: 'calc(100%/3)', borderTopRightRadius: '.25rem', borderBottomRightRadius: '.25rem' }} 
                          />
                        </Input.Group>
                      </Col>

                      <Col xs={24} sm={24} md={7} lg={6} xl={6}>
                        <ButtonColor
                          block
                          disabled={!infoVariant.price.value && !infoVariant.stock.value && !infoVariant.code.value}
                          type="primary" 
                          className="h-35"
                          onClick={setInfoVariantHandler}
                        >
                          Terapkan ke Semua
                        </ButtonColor>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
              </Card.Body>

              <Card.Body className="p-3">
                <Table
                  bordered
                  pagination={false} 
                  className="variant-table"
                  size="middle"
                  rowClassName={() => 'variant-row'}
                  components={components}
                  columns={mergedColumns} 
                  dataSource={createNewArr(dataSource)} 
                />
              </Card.Body>
            </>
          )}

        </Card.Body>

        <Card.Body className="p-3">
          {countVariation < 2 && (
            <ButtonColor
              block with="dashed" type="primary" 
              className="h-35" icon={<PlusCircleOutlined />}
              onClick={() => activeVariantHandler(countVariation+1)}
            >
              Aktifkan Variasi
            </ButtonColor>
          )}
        </Card.Body>
      </Card>

      <style jsx>{`
        :global(.ant-input-number-input){
          position: relative;
        }
        :global(.info-variasi-input .ant-input-number:focus, .info-variasi-input .ant-input-number-focused, .info-variasi-input .ant-input-number:hover){
          z-index: 3;
        }
        :global(.info-variasi-input .ant-input:focus, .info-variasi-input .ant-input-focused, .info-variasi-input .ant-input:focus){
          box-shadow: none;
        }
        :global(.variant-table .ant-table-tbody > tr.ant-table-row:hover > td){
          background: transparent;
        }
        :global(.variant-row > td:first-child){
          font-size: 13px;
          padding: 5px 8px !important;
        }


        :global(.variant-input-tooltip .ant-tooltip-inner){
          padding: 0px 5px;
          min-height: 24px;
          white-space: nowrap;
        }
        :global(.ant-tooltip-open > div){
          position: relative !important;
        }
        :global(.ant-tooltip-open > div > div > .ant-tooltip){
          top: -55px !important;
          left: 0 !important;
        }
        :global(.td-input-variant .show-help.show-help-enter, 
                .td-input-variant .show-help.show-help-leave.show-help-start,
                .td-input-variant .show-help.show-help-leave.show-help-active,
        ){
          height: 0 !important;
          display: none !important;
        }
      `}</style>
    </>
  )
}

export default TableVariant
