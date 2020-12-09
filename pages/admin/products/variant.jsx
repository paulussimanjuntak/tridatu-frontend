import { useState, useEffect } from 'react'
import { Table, Input, Form } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'

import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'
import ButtonColor from "antd-button-color"
import isIn from 'validator/lib/isIn'
import isEmpty from 'validator/lib/isEmpty'
const formItemLayout = { wrapperCol: { xs: { span: 24 }, sm: { span: 24 }, md: { span: 18 }, lg: { span: 14 }, xl: { span: 12 }, }, };

const FormError = ({ children }) => <small className="form-text text-left text-danger mb-0">{children}</small>

const createNewArr = (data) => {
  return data
    .reduce((result, item) => {
      if (result.indexOf(item.va1_option) < 0) {
        result.push(item.va1_option);
      }
      return result;
    }, [])
    .reduce((result, va1_option) => {
      const children = data.filter((item) => item.va1_option === va1_option);
      result = result.concat(
        children.map((item, index) => ({
          ...item,
          rowSpan: index === 0 ? children.length : 0,
        }))
      );
      return result;
    }, []);
};

const getIndex = (value, arr, prop) => {
  for(var i = 0; i < arr.length; i++) {
    if(arr[i][prop] === value) {
      return i;
    }
  }
  return -1; //to handle the case where the value doesn't exist
}

const initCol = [
  {
    title: 'Harga',
    dataIndex: 'price',
    key: 'price',
    editable: true,
  },
  {
    title: 'Stok',
    dataIndex: 'stock',
    key: 'stock',
    editable: true,
  },
  {
    title: 'Kode Variasi',
    dataIndex: 'code',
    key: 'code',
    editable: true,
  },
]

const additional = {
  price: 0,
  stock: 0
}


const TableVariant = () => {
  const [count, setCount] = useState(0)
  const [totalVariant, setTotalVariant] = useState({ va1: 1, va2: 1 })
  const [columns, setColumns] = useState(initCol)
  const [dataSource, setDataSource] = useState([])
  const [vaOption, setVaOption] = useState({ va1Option: [], va2Option: [], va1Total: 0, va2Total: 0 })
  const [isActiveVariation, setIsActiveVariation] = useState({ active: false, countVariation: 0 })

  const { countVariation } = isActiveVariation
  const { va1, va2 } = totalVariant
  const { va1Option, va2Option, va1Total, va2Total } = vaOption

  const checkDuplicate = (value, option) => {
    if(option !== "head_title"){
      let dataAvailable = []
      let variant = option.split("_")
      let lastData = variant.length - 1

      dataSource.map(data => dataAvailable.push(data[`va${variant[lastData]}_option`]))

      if(value && isIn(value, dataAvailable)) return false
      else return true
    } 
    else {
      if(columns[1].key === "va2_option"){
        if(columns[1].title === columns[0].title) return false
        else return true
      }
      else return true
    }
  }

  const rules = (e) => {
    const option = (e.prefixName || e.__INTERNAL__.name)
    let variant = "Pilihan"
    if(option === "head_title") variant = "Nama"
    return ({
      required: true,
      whitespace: true,
      validator: (_, value) => isEmpty(value || "", { ignore_whitespace:true }) ?  Promise.reject(<FormError>{variant} tidak boleh kosong.</FormError>) : 
                               checkDuplicate(value, option) ?  Promise.resolve() : Promise.reject(<FormError>{variant} tidak boleh sama.</FormError>),
    })
  }

  const addVariant = (variant) => {
    const dataLength = dataSource.length
    const va2Length = va2Option.length
    if(variant == 1){
      const data = {
        ...vaOption,
        va1Option: [...va1Option, {key: `va${variant}_option${dataLength+1+count}`, va1_option: "", ...additional}],
        va1Total: va1Total + 1
      }
      setVaOption(data)
      setTotalVariant({...totalVariant, va1: va1+1})
    }
    if(variant == 2){
      const data = {
        ...vaOption,
        va2Option: [...va2Option, {key: `va${variant}_option${va2Length}`, va2_option: "", ...additional}],
        va2Total: va2Total + 1
      }
      setVaOption(data)
      setTotalVariant({...totalVariant, va2: va2+1})
    }
  }

  const addColumVariantHandler = (variant) => {
    const copyColumns = columns.splice(0)
    let data = {
      title: `Nama`,
      dataIndex: `va${variant}_option`,
      key: `va${variant}_option`,
    }
    if(variant == 2){
      copyColumns[0] = {
        ...copyColumns[0],
        render: (_, row) => {
          return {
            children: row.va1_option,
            props: { rowSpan: row.rowSpan, }
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
  }

  const onVariantHeadChange = valKey => e => {
    const value = e.target.value
    const idx = getIndex(valKey, columns, 'key')
    let newColumns = [...columns]
    newColumns[idx].title = value || "Nama"
    setColumns(newColumns)
  }

  const onVariantOptionChange = (idx, variant) => e => {
    const value = e.target.value

    let newVaOption = [...vaOption[`va${variant}Option`]]
    for(let [key, val] of Object.entries(newVaOption)){
      if(idx == key) val[`va${variant}_option`] = value
    }
    setVaOption({ ...vaOption, [`va${variant}Option`]: newVaOption })
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

      setVaOption(data)
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
      setVaOption({ ...vaOption, va2Option: [], va2Total: 0 })
      setColumns(oldColumns);
    }
  }

  useEffect(() => {
    let variants = []
    for(let [key1, val1] of Object.entries(va1Option)){
      let variant_tmp = []
      if(vaOption.va2Option.length){
        for(let [key2, val2] of Object.entries(va2Option)){
          variant_tmp.push({
            key: val1.key ? val1.key+1+key1+key2 : 1+key1+key2,
            va1_key: +key1,
            va2_key: +key2,
            va1_option: val1.va1_option ? val1.va1_option : `Pilihan ${+key1+1}`,
            va2_option: val2.va2_option ? val2.va2_option : `Pilihan ${+key2+1}`,
            ...additional
          })
        }
      }
      else{
        variant_tmp.push({
          key: val1.key ? val1.key+1+key1 : 1+key1,
          va1_option: val1.va1_option ? val1.va1_option : `Pilihan ${+key1+1}`,
          ...additional
        })
      }
      for(let item of variant_tmp){
        variants.push(item)
      }
    }
    setDataSource(variants)
  },[vaOption])

  return(
    <>
      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3">

          {[...Array(countVariation)].map((_, i) => (
            <Card.Body className="p-3 bg-light" key={i}>
              <p className="fs-14 mb-2">Variasi {i+1}</p>
              <Form layout="vertical" {...formItemLayout} name="head_title">
                <Form.Item 
                  className="mb-3"
                  label="Nama"
                  name={`va${i+1}_option`}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[ rules ]}
                >
                  <Media className="align-items-center">
                    <Input 
                      name={`va${i+1}_name`}
                      value={columns[i].title.split(" ")[0] === "Nama" ? "" : columns[i].title} 
                      placeholder={i == 0 ? "Masukkan Nama Variasi, contoh: Warna, dll." : i == 1 ? "Masukkan Nama Variasi, contoh: Ukuran, dll." : ""} 
                      onChange={onVariantHeadChange(`va${i+1}_option`)}
                      className="h-35"
                    />
                    <Media.Body>
                      <div style={{ width: 22 }} />
                    </Media.Body>
                  </Media>
                </Form.Item>
              </Form>

              <Form layout="vertical" {...formItemLayout} name={`variants_${i+1}`}>
                {/* VARIANT 1 */}
                {i == 0 && [...Array(va1Total)].map((_,idx) => (
                  <Form.Item label={idx === 0 && 'Pilihan'} className="my-2 w-100" name={`variants_${idx+1}`} validateTrigger={['onChange']} rules={[ rules ]} key={idx}>
                    <Media className="align-items-center">
                      <Input 
                        className="h-35" 
                        name="va1_option"
                        value={va1Option[idx].va1_option} 
                        onChange={onVariantOptionChange(idx, i+1)}
                        placeholder={i == 0 ? "Masukkan Pilihan Variasi, contoh: Merah, dll." : i == 1 ? "Masukkan Pilihan Variasi, contoh: S, M, dll." : ""} 
                      />
                      <Media.Body> 
                        {idx == 0 && <div style={{ width: 22 }} />} {idx == 1 && <div style={{ width: 22 }} />}
                        {va1Total > 1 ? (
                          <i className="fal fa-trash-alt ml-2 hover-pointer text-secondary" />
                        ) : null}
                      </Media.Body> 
                    </Media>
                  </Form.Item>
                ))}

                {/* VARIANT 2 */}
                {i == 1 && [...Array(va2Total)].map((_,idx) => (
                  <Form.Item label={idx === 0 && 'Pilihan'} className="my-2 w-100" name={`variants_${idx+1}`} validateTrigger={['onChange']} rules={[ rules ]} key={idx}>
                    <Media className="align-items-center">
                      <Input 
                        className="h-35" 
                        name="va2_option"
                        value={va2Option[idx].va2_option} 
                        onChange={onVariantOptionChange(idx, i+1)}
                        placeholder={i == 0 ? "Masukkan Pilihan Variasi, contoh: Merah, dll." : i == 1 ? "Masukkan Pilihan Variasi, contoh: S, M, dll." : ""} 
                      />
                      <Media.Body> 
                        {idx == 0 && <div style={{ width: 22 }} />} {idx == 1 && <div style={{ width: 22 }} />}
                        {va2Total > 1 ? (
                          <i className="fal fa-trash-alt ml-2 hover-pointer text-secondary" />
                        ) : null}
                      </Media.Body>
                    </Media>
                  </Form.Item>
                ))}

                {i == 0 && va1Total < 20 && (
                  <Form.Item className="my-1">
                    <Media className="align-items-center">
                      <ButtonColor block with="dashed" type="primary" className="h-35" icon={<PlusCircleOutlined />} onClick={() => addVariant(i+1)}>
                        Tambahkan Pilihan ({va1Total+1}/20)
                      </ButtonColor>
                      <ButtonColor block with="dashed" type="danger" className="h-35" onClick={() => deleteGroupVariantsHandler(i+1)}>
                        HAPUS VARIAN
                      </ButtonColor>
                      <Media.Body> <div style={{ width: 22 }} /> </Media.Body>
                    </Media>
                  </Form.Item>
                )}

                {i == 1 && va2Total < 20 && (
                  <Form.Item className="my-1">
                    <Media className="align-items-center">
                      <ButtonColor block with="dashed" type="primary" className="h-35" icon={<PlusCircleOutlined />} onClick={() => addVariant(i+1)}>
                        Tambahkan Pilihan ({va2Total+1}/20)
                      </ButtonColor>
                      <ButtonColor block with="dashed" type="danger" className="h-35" onClick={() => deleteGroupVariantsHandler(i+1)}>
                        HAPUS VARIAN
                      </ButtonColor>
                      <Media.Body> <div style={{ width: 22 }} /> </Media.Body>
                    </Media>
                  </Form.Item>
                )}

              </Form>

            </Card.Body>
          ))}

          <Card.Body className="p-3 bg-light">
            <Table 
              bordered
              size="middle" 
              pagination={false} 
              columns={columns} 
              dataSource={createNewArr(dataSource)} 
              className="variant-table" 
            />
          </Card.Body>

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
        :global(.variant-table .ant-table-tbody > tr.ant-table-row:hover > td){
          background: transparent;
        }
      `}</style>
    </>
  )
}

export default TableVariant
