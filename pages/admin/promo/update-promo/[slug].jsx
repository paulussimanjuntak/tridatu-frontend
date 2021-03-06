import { withAuth } from 'lib/withAuth'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Form, Input, Radio, Popover, Space, Upload, DatePicker } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import id from 'locales/id/admin/promo/new-promo'
import en from 'locales/en/admin/promo/new-promo'

import _ from 'lodash'
import moment from 'moment'
import Link from 'next/link'
import axios from 'lib/axios'
import dynamic from 'next/dynamic'
import isIn from 'validator/lib/isIn'
import Button from 'antd-button-color'
import Card from 'react-bootstrap/Card'
import * as actions from 'store/actions'
import isEmpty from 'validator/lib/isEmpty'
import isLength from 'validator/lib/isLength'
import ErrorMessage from 'components/ErrorMessage'
import AddStyleAdmin from 'components/Admin/addStyle'
import PageInfoPopover from 'components/Admin/Voucher/PageInfoPopover'

import { formImage } from 'formdata/formImage'
import { columnsVoucher, columnsOngkir } from 'data/voucher'
import { imageValidation, uploadButton } from 'lib/imageUploader'
import { formPromo, formTermsCondition, formPromoIsValid } from 'formdata/formPromo'
import { dateTimeFormat, disabledDateDiffOneDay, disabledRangeSameTime } from 'lib/utility'
import { formHeaderHandler, jsonHeaderHandler, resNotification, signature_exp, formErrorMessage } from 'lib/axios'

const params = { is_code: false, is_other: false }
const Editor = dynamic(import('components/Editor'), { ssr: false })

const UpdatePromoContainer = () => {
  const router = useRouter()

  const promoData = useSelector(state => state.promo.promoSlug)

  const { locale } = router
  const t = locale === "en" ? en : id

  const [loading, setLoading] = useState(false)
  const [promo, setPromo] = useState(formPromo)
  const [imageList, setImageList] = useState(formImage)
  const [termsCondition, setTermsCondition] = useState(formTermsCondition)

  const { promos_id, promos_terms_condition, promos_image, promos_period_start, promos_period_end } = promoData
  const { name, desc, seen, period_start, period_end } = promo
  const { terms_condition } = termsCondition

  /*SET DATA FROM SERVER*/
  useEffect(() => {
    if(promoData){
      const stateBasicDetail = JSON.parse(JSON.stringify(promo))
      const stateTermsCondition = JSON.parse(JSON.stringify(termsCondition))
      for(let key in promoData){
        let newKey = key.split("_")[1]
        if(stateBasicDetail[newKey]) {
          stateBasicDetail[newKey].value = promoData[key]
        }
      }
      if(promos_image){
        const imageData = {
          uid: -Math.abs(Math.random()),
          url: `${process.env.NEXT_PUBLIC_API_URL}/static/promos/${promos_image}`
        }
        const data = {
          ...imageList,
          file: {value: [imageData], isValid: true, message: null}
        }
        setImageList(data)
      }
      stateBasicDetail["period_start"].value = moment(promos_period_start)
      stateBasicDetail["period_end"].value = moment(promos_period_end)
      stateTermsCondition["terms_condition"].value = promos_terms_condition
      setPromo(stateBasicDetail)
      setTermsCondition(stateTermsCondition)
    }
  }, [promoData])
  /*SET DATA FROM SERVER*/

  const onChangeHandler = e => {
    const name = e.target.name
    const value = e.target.value
    const data = {
      ...promo,
      [name]: {
        ...promo[name], value: value, isValid: true, message: null
      }
    }
    setPromo(data)
  }

  const onSeenChange = e => {
    const value = e.target.value
    const data = {
      ...promo,
      seen: { value: value, isValid: true, message: null },
      desc: { value: "", isValid: true, message: null },
    }
    setPromo(data)
    setImageList(formImage)
    setTermsCondition(formTermsCondition)
  }

  const onTermsConditionChange = val => {
    setTermsCondition({ terms_condition: { value: val, isValid: true, message: null } })
  }

  const dateChange = (_, dateStrings) => {
    let startVal = moment(promos_period_start)
    let endVal = dateStrings[1]

    const data = {
      ...promo,
      period_start: { value: startVal, isValid: true, message: null },
      period_end: { value: endVal, isValid: true, message: null },
    }
    setPromo(data)
  }

  const onOkDateChange = (date) => {
    let startVal = moment(promos_period_start)
    let endVal = date[1] || ""

    if(!moment(endVal).diff(moment(startVal), 'days')) endVal = moment(startVal).add(1, "days")

    const data = {
      ...promo,
      period_start: { value: startVal, isValid: true, message: null },
      period_end: { value: endVal, isValid: true, message: null },
    }
    setPromo(data)
  }

  const imageChangeHandler = ({ fileList: newFileList }) => {
    const data = {
      ...imageList,
      file: { value: newFileList, isValid: true, message: null }
    }
    setImageList(data)
  };

  const resetAllHandler = () => {
    const start = moment().add(15, "minutes").format(dateTimeFormat)
    const inititalData = {
      ...formPromo,
      period_start: { value: start, isValid: true, message: null },
      period_end: { value: moment(start).add(1, "days").format(dateTimeFormat), isValid: true, message: null },
    }
    setPromo(inititalData)
    setImageList(formImage)
    setTermsCondition(formTermsCondition)
  }

  const onSubmitHandler = e => {
    e.preventDefault()
    if(formPromoIsValid(promo, setPromo, termsCondition, setTermsCondition, t)){
      setLoading(true)
      const formData = new FormData()
      formData.append("name", name.value);
      formData.append("seen", seen.value);
      formData.append("period_start", moment(promos_period_start).format(dateTimeFormat));
      formData.append("period_end", moment(period_end.value).format(dateTimeFormat));

      if(seen.value){
        let plainText = terms_condition.value.replace(/<[^>]+>/g, '');
        let finalText = plainText.replace(/&nbsp;/g, " ");

        if(isEmpty(finalText)) finalText = finalText
        else {
          if(isLength(finalText, { min: 5, max: undefined })) finalText = terms_condition.value
          else finalText = finalText
        }

        formData.append("desc", desc.value);
        formData.append("terms_condition", finalText);

        _.forEach(imageList.file.value, file => {
          if(!file.hasOwnProperty('url')) formData.append("image", file.originFileObj)
        })
      }

      axios.put(`/promos/update/${promos_id}`, formData, formHeaderHandler())
        .then(res => {
          setLoading(false)
          resetAllHandler()
          resNotification("success", "Success", res.data.detail)
          router.push("/admin/promo")
        })
        .catch(err => {
          const state = JSON.parse(JSON.stringify(promo));
          const termsConditionState = JSON.parse(JSON.stringify(termsCondition))

          const errDetail = err.response.data.detail;
          const errName = ["The name has already been taken.", "Nama sudah dipakai."]
          const errDesc = ["Please fill desc field.", "Harap isi inputan desc."]
          const errTerm = ["Please fill terms_condition field.", "Harap isi inputan terms_condition."]
          const errPeriod = ["Time data 'Invalid date' does not match format '%d %b %Y %H:%M'", "Data waktu 'Invalid date' tidak cocok dengan format '%d %b %Y %H:%M'"]
          
          setLoading(false)
          if(errDetail == signature_exp){
            resetAllHandler()
            resNotification("success", "Success", t.success_update)
            router.push("/admin/promo")
          }
          else if(typeof(errDetail) === "string" && isIn(errDetail, errName)){
            state.name.value = state.name.value
            state.name.isValid = false
            state.name.message = errDetail
          }
          else if(typeof(errDetail) === "string" && isIn(errDetail, errDesc)){
            state.desc.value = state.desc.value
            state.desc.isValid = false
            state.desc.message = errDetail
          }
          else if(typeof(errDetail) === "string" && isIn(errDetail, errTerm)){
            termsConditionState.terms_condition.value = termsConditionState.terms_condition.value
            termsConditionState.terms_condition.isValid = false
            termsConditionState.terms_condition.message = errDetail
          }
          else if(typeof(errDetail) === "string" && isIn(errDetail, errPeriod)){
            state.period_end.value = state.period_end.value
            state.period_end.isValid = false
            state.period_end.message = errDetail
          }
          else if(typeof(errDetail) === "string" && !isIn(errDetail, [...errName, ...errDesc, ...errTerm, ...errPeriod])){
            formErrorMessage(errDetail)
          }
          else{
            errDetail.map((data) => {
              const key = data.loc[data.loc.length - 1];
              if(state[key]){
                state[key].isValid = false
                state[key].message = data.msg
              }
              if(termsConditionState[key]){
                termsConditionState[key].isValid = false
                termsConditionState[key].message = data.msg
              }
            });
          }
          setPromo(state)
          setTermsCondition(termsConditionState)
        })
    }
  }
  
  return(
    <>
      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">{t.basic_details.title}</h5>
        </Card.Body>
        <Card.Body className="p-3">
          <Form layout="vertical">
            <Form.Item 
              required
              label={t.basic_details.promo_name} 
              validateStatus={!name.isValid && name.message && "error"}
            >
              <Input name="name"
                value={name.value}
                onChange={onChangeHandler}
                placeholder={t.basic_details.promo_name}
              />
              {name.isValid ? (
                <small className="form-text text-left text-muted">
                  {t.basic_details.example_name}
                </small>
              ):(
                <ErrorMessage item={name} />
              )}
            </Form.Item>
            
            <Form.Item 
              required
              label={t.basic_details.claim_period} 
              validateStatus={(!period_start.isValid && period_start.message || !period_end.isValid && period_end.message) && "error"}
            >
              <DatePicker.RangePicker 
                showTime 
                inputReadOnly
                onChange={dateChange}
                onOk={onOkDateChange}
                format={dateTimeFormat}
                disabled={[true, false]}
                disabledDate={(current) => disabledDateDiffOneDay(current, promos_period_start)}
                disabledTime={(current, type) => disabledRangeSameTime(current, type, moment(period_start.value))}
                value={[moment(promos_period_start), period_end.value !== "" && moment(period_end.value)]}
              />
              <span className="ml-2">WITA</span>
              <ErrorMessage item={!period_start.isValid && period_start || !period_end.isValid && period_end} />
            </Form.Item>

            <Form.Item 
              required 
              className="mb-0"
              label={t.basic_details.display_settings} 
              validateStatus={!seen.isValid && seen.message && "error"}
            >
              <Radio.Group name="seen" value={seen.value} onChange={onSeenChange}>
                <Radio value={true} className="noselect d-block h-30">
                  {t.basic_details.show_on_all_pages}
                  <Popover placement="bottomLeft" content={<PageInfoPopover t={t} />}>
                    <i className="fal fa-question-circle ml-1" />
                  </Popover>
                </Radio>
                <Radio value={false} className="noselect d-block h-30">
                  {t.basic_details.not_shown}
                  <Popover placement="bottomLeft" content={
                    <small className="form-text text-left text-muted mt-0 text-wrap text-center">
                      {t.basic_details.not_shown_info1} <br/>{t.basic_details.not_shown_info2}
                    </small>
                    }
                  >
                    <i className="fal fa-question-circle ml-1" />
                  </Popover>
                </Radio>
              </Radio.Group>
              <ErrorMessage item={seen} />
            </Form.Item>

          </Form>
        </Card.Body>
      </Card>
      
      {seen.value && (
        <Card className="border-0 shadow-sm card-add-product">
          <Card.Body className="p-3 border-bottom">
            <h5 className="mb-0 fs-16-s">{t.information_settings.title}</h5>
          </Card.Body>
          <Card.Body className="p-3">
            <Form layout="vertical">
              <Form.Item label={`${t.information_settings.promo_photos} (600 × 328 px)`} className="mb-0">
                <Upload
                  accept="image/*"
                  listType="picture-card"
                  className="avatar-uploader"
                  disabled={loading}
                  onChange={imageChangeHandler}
                  fileList={imageList.file.value}
                  beforeUpload={(f) => imageValidation(f, "image", "/promos/create", "post", () => {}, () => {}, "")}
                >
                  {imageList.file.value.length >= 1 ? null : uploadButton(loading)}
                </Upload>
              </Form.Item>
              <small className="text-muted fs-12">
                {t.validation.img_format} .jpg .jpeg .png<br/>
                {t.validation.img_size} 4 MB
              </small>

              <Form.Item 
                className="m-t-20"
                label={t.information_settings.promo_description}
                validateStatus={!desc.isValid && desc.message && "error"}
              >
                <Input.TextArea 
                  name="desc"
                  placeholder={t.information_settings.promo_description}
                  value={desc.value}
                  onChange={onChangeHandler}
                  autoSize={{ minRows: 8, maxRows: 10 }} 
                />
                <ErrorMessage item={desc} />
              </Form.Item>
              
              <Form.Item 
                label={t.information_settings.terms_conditions}
                validateStatus={!terms_condition.isValid && terms_condition.message && "error"}
              >
                <Editor 
                  initialValue={terms_condition.value}
                  setContent={onTermsConditionChange} 
                  height="200"
                />
                <ErrorMessage item={terms_condition} />
              </Form.Item>

            </Form>
          </Card.Body>
        </Card>
      )}

      <Space>
        <Button className="btn-tridatu" onClick={onSubmitHandler} disabled={loading}>
          {loading ? <LoadingOutlined /> : t.save}
        </Button>
        <Link href="/admin/promo">
          <Button>{t.cancel}</Button>
        </Link>
      </Space>

      <style jsx>{AddStyleAdmin}</style>
    </>
  )
}

UpdatePromoContainer.getInitialProps = async ctx => {
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

export default withAuth(UpdatePromoContainer)
