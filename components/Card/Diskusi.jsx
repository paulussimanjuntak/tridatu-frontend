import { Comment, Avatar } from 'antd';
import Form from 'react-bootstrap/Form';
import ButtonBoot from 'react-bootstrap/Button';

const DiskusiContainer = ({ children, body }) => {
  const author = ( <b>Han Solo</b> )
  const avatar = (
    <Avatar
      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      alt="Han Solo"
    />
  )
  const content = (
    <p> We supply a series of design principles, practical patterns and high quality design
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
      <ButtonBoot disabled size="sm" className="btn-tridatu px-3">Kirim</ButtonBoot>
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
      `}</style>
    </>
  )
}

export default DiskusiContainer
