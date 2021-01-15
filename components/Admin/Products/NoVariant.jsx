import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, InputNumber } from 'antd'
import { AnimatePresence, motion } from "framer-motion";

import _ from 'lodash'
import axios, { jsonHeaderHandler, formHeaderHandler, resNotification, signature_exp } from 'lib/axios'

import { formImage, formImageIsValid } from 'formdata/formImage'
import { imagePreview, uploadButton } from 'lib/imageUploader'
import { imageValidationProduct, multipleImageValidation } from 'lib/imageProductUploader'

import ErrorTooltip from "components/ErrorMessage/Tooltip";

import { formItemLayout } from 'data/productsAdmin'

const NoVariant = ({ noVariant, onNoVariantChangeHandler }) => {

  const { va1_price, va1_stock, va1_code, va1_barcode } = noVariant

  return(
    <>
      <Form layout="vertical" {...formItemLayout}>
        <Form.Item 
          required
          label="Harga" 
          validateStatus={!va1_price.isValid && va1_price.message && "error"}
        >
          <div className="ant-input-group-wrapper">
            <div className="ant-input-wrapper ant-input-group">
              <span className="ant-input-group-addon noselect">Rp</span>
              <InputNumber
                min={1}
                name="va_1price"
                className="w-100 bor-left-rad-0 h-33-custom-input"
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                parser={value => value.replace(/\Rp\s?|(\.*)/g, '')}
                value={va1_price.value}
                onChange={e => onNoVariantChangeHandler(e, "va1_price")}
              />
            </div>
          </div>
          <ErrorTooltip item={va1_price} />
        </Form.Item>

        <Form.Item 
          required
          label="Stok" 
          validateStatus={!va1_stock.isValid && va1_stock.message && "error"}
        >
          <InputNumber 
            min={0} 
            name="va1_stock"
            placeholder="Jumlah Stok"
            className="w-100 h-33-custom-input" 
            value={va1_stock.value}
            onChange={e => onNoVariantChangeHandler(e, "va1_stock")}
          />
          <ErrorTooltip item={va1_stock} />
        </Form.Item>

        <Form.Item 
          label="Kode Variasi"
          validateStatus={!va1_code.isValid && va1_code.message && "error"}
        >
          <Input 
            className="h-35" 
            name="va1_code"
            placeholder="Kode Variasi" 
            value={va1_code.value}
            onChange={e => onNoVariantChangeHandler(e)}
          />
          <ErrorTooltip item={va1_code} />
        </Form.Item>

        <Form.Item 
          label="Barcode" 
          className="mb-4"
          validateStatus={!va1_barcode.isValid && va1_barcode.message && "error"}
        >
          <Input 
            className="h-35" 
            name="va1_barcode"
            placeholder="Barcode" 
            value={va1_barcode.value}
            onChange={e => onNoVariantChangeHandler(e)}
          />
          <ErrorTooltip item={va1_barcode} />
        </Form.Item>

      </Form>
    </>
  )
}

export default NoVariant
