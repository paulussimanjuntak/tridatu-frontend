import { Space, Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const ListCodeCellUpdate = ({ t, index, record, editable, onRemove, onEdit, type, children, ...restProps }) => {
  let childNode = children

  if(editable){
    childNode = (
      type === "action" && (
        <Space>
          <Button type="primary" ghost icon={<EditOutlined />} onClick={onEdit}>
            {t.edit}
          </Button>
          <Button className="btn-tridatu" icon={<DeleteOutlined />} onClick={() => onRemove(record.key)}>
            {t.delete}
          </Button>
        </Space>
      )
    )
  }
  
  return <td {...restProps}>{childNode}</td>
}

export default ListCodeCellUpdate
