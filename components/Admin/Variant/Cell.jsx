import { useContext, useState, useEffect, useRef } from 'react'
import { Input, InputNumber, Form, Tooltip } from 'antd'

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  inputType,
  currentRowValues,
  onChange,
  index,
  onBlur,
  ...restProps
}) => {

  let childNode = children;

  if (editable) {
    childNode = (
      <Form>
        {inputType === "price" && (
          <Form.Item 
            name="price" 
            className="mb-0 h-30 input-form-variant"
          >
            <Tooltip 
              color="red"
              placement="topLeft"
              visible={!record[inputType].isValid && record[inputType].message}
              title={<small className="fs-10">{record[inputType].message}</small>}
              autoAdjustOverflow
              overlayClassName="variant-input-tooltip"
            >
              <div className="ant-input-group-wrapper">
                <div className="ant-input-wrapper ant-input-group input-group-variant" style={{ zIndex: 1 }}>
                  <span className="ant-input-group-addon noselect fs-12 bg-transparent">Rp</span>
                  <InputNumber
                    name="price"
                    placeholder="Masukkan harga"
                    className="w-100 bor-left-rad-0 h-33-custom-input fs-12 input-number-variant"
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    parser={value => value.replace(/\Rp\s?|(\.*)/g, '')}
                    value={record[inputType].value}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                </div>
              </div>
            </Tooltip>
          </Form.Item>
        )}
        {inputType === "stock" && (
          <Form.Item 
            name="stock" 
            className="mb-0 h-30 input-form-variant"
          >
            <Tooltip 
              color="red"
              placement="topLeft"
              visible={!record[inputType].isValid && record[inputType].message}
              title={<small className="fs-10">{record[inputType].message}</small>}
              autoAdjustOverflow
              overlayClassName="variant-input-tooltip"
            >
              <div>
                <InputNumber 
                  min={0} 
                  name="stock"
                  className="w-100 fs-12 input-number-variant"
                  placeholder="Masukkan stok" 
                  value={record[inputType].value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </div>
            </Tooltip>
          </Form.Item>
        )}
        {inputType === "code" && (
          <Form.Item className="mb-0" name="code">
            <div>
              <Input.TextArea 
                autoSize 
                name="code" 
                className="h-30 fs-12 input-code-variant"
                placeholder="Kode Variasi" 
                bordered={false}
                onChange={onChange} 
                value={record[inputType].value} 
                onBlur={onBlur}
                style={{ resize: "none" }}
              />
            </div>
          </Form.Item>
        )}
      </Form>
    ) 
  }

  return (
    <>
      <td {...restProps} className="p-2 td-input-variant">{childNode}</td>
      <style jsx>{`
        :global(.input-group-variant > .ant-input-group-addon){
          border-left: 0 !important;
          border-top: 0 !important;
          border-bottom: 0 !important;
          border-right: 1px solid #f0f0f0;
          padding: 5px;
          padding-right: 8px;
          color: #6c757d!important;
        }
        :global(.input-number-variant){
          border: 0 !important;
        }
        :global(.input-number-variant > .ant-input-number-handler-wrap){
          display: none !important;
        }
        :global(.input-number-variant .ant-input-number-input::-webkit-input-placeholder, .input-number-variant .ant-input-number-input, .input-code-variant){
          text-align: center;
        }
        :global(.input-code-variant){
          line-height: 23px !important;
        }
        :global(.input-code-variant::-webkit-input-placeholder){
          text-align: center;
          line-height: 2.2 !important;
        }
        :global(.input-code-variant:focus){
          box-shadow: none !important;
        }
        :global(.ant-form-item-explain-error, .ant-form-item-extra, .ant-form-item-explain){
          display: contents;
          height: 0!important;
          min-height: 0!important;
          transition: none !important;
        }
        :global(.input-form-variant.ant-form-item-has-error .ant-input-number:focus, .input-form-variant.ant-form-item-has-error .ant-input-number-focused){
          box-shadow: none !important;
        }
        :global(.variant-table-tooltip .ant-tooltip-inner){
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
};

export default EditableCell 
