import Container from 'react-bootstrap/Container';

const Admin = () => {
  return(
    <>
      {[...Array(20)].map((_, x) => (
        <p key={x}>
          Bill is a cat.
        </p>
      ))}
    </>
  )
}

export default Admin
