import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

const EmptyPromo = () => {
  return(
    <>
      <Container>
        <Card className="text-muted mt-3 pt-5 pb-5 border-0">
          <Card.Img variant="top" src="/static/svg/box.svg" className="mx-auto empty-img" />
          <Card.Body className="pb-0">
            <Card.Title className="text-center mb-0">
              Tidak ada promo
            </Card.Title>
          </Card.Body>
        </Card>
      </Container>

      <style jsx>{`
        :global(.empty-img){
          width: auto;
          height: 100px;
          opacity: 0.5;
        }
      `}</style>
    </>
  )
}

export default EmptyPromo
