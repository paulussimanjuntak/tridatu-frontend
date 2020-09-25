import { Comment, Avatar, Popconfirm } from 'antd';
import Form from 'react-bootstrap/Form';
import ButtonBoot from 'react-bootstrap/Button';
import moment from 'moment';

const DiskusiContainer = ({ children, head, body }) => {
  const author = ( 
    <>
      <b>Han Solo</b> 
      <span className="diskusi-date">
        {moment().fromNow()} 
        <span className="action-btn">
          <Popconfirm
            title={`${head ? "Hapus diskusi?" : "Hapus komentar?"}`}
            okText="Ya"
            cancelText="Batal"
            placement="bottomRight"
            arrowPointAtCenter
          >
            <i className="fal fa-ellipsis-h-alt" />
          </Popconfirm>
        </span>
      </span>
    </>
  )

  const avatar = (
    <Avatar
      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      alt="Han Solo"
    />
  )

  const content = (
    <p>We supply a series of design principles, practical patterns and high quality design
      resources (Sketch and Axure).
    </p>
  )

  const reply = (
    <Form>
      <Form.Group>
        <Form.Control 
          rows={1}
          as="textarea" 
          className="form-komentar"
          placeholder="Isi komentar disini..."
        />
      </Form.Group>
      <ButtonBoot disabled size="sm" className="btn-tridatu px-3 mb-2">Kirim</ButtonBoot>
    </Form>
  )

  return(
    <>
      <Comment
        avatar={avatar}
        author={body === "isi" ? author : body === "balas" && <></>}
        content={body === "isi" ? content : body === "balas" && reply}
      >
        {children}
      </Comment>

      <style jsx>{`
        :global(.form-komentar){
          font-size: .8rem;
          font-weight: 300;
        }
        :global(.ant-comment-content-author-name > .diskusi-date){
          color: #ccc !important;
          padding-left: 8px;
        }
        :global(.ant-comment-content-author-name){
          width: 100%;
        }
        :global(.ant-comment-content-author > .ant-comment-content-author-name .action-btn){
          float: right;
        }
        :global(.action-btn){
          color: #343a40!important;
        }
        :global(.action-btn:hover){
          cursor: pointer;
        }
      `}</style>
    </>
  )
}

export default DiskusiContainer
