import Button from "antd-button-color"
const EditableCell = ({ record, index, children, action, onSet, onUpdate, ...restProps }) => {

  let childNode = children;

  if(action){
    let text = <><i className="far fa-plus mr-1" /> Atur Diskon</>
    if(record.products.promo_active) text = <><i className="far fa-edit mr-1" /> Ubah Diskon</>

    childNode = (
      <>
        <Button 
          type="primary" 
          with={`${record.products.promo_active && "dashed"}`}
          onClick={record.products.promo_active ? () => onUpdate(index) : () => onSet(record.products.products_slug)}
        >
          {text}
        </Button>
      </>
    )
  }

  return(
    <>
      <td {...restProps} className="p-2 td-input-variant">{childNode}</td>
    </>
  )
}

export default EditableCell
