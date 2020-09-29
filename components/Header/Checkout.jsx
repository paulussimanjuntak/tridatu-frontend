import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const CheckoutHeader = () => {
  return (
    <>
      <Navbar
        expand="lg"
        expanded={false}
        variant="light"
        bg="light"
        fixed="top"
        className="bg-white navbar-shadow-bottom py-2 noselect"
      >
        <Container>
          <Navbar.Brand href="/" className="font-italic">
            <img
              src="/tridatu-icon.png"
              className="d-inline-block align-top logo-navbar"
              alt="Tridatu Bali ID"
            />
            <span className="text-dark font-weight-bold align-self-center align-baseline-middle pl-1 text-navbar">
              Tridatu
              <span className="text-muted font-weight-bold text-navbar"> Bali ID</span>
            </span>
          </Navbar.Brand>

        </Container>
      </Navbar>

      <style jsx>{`
        :global(.navbar-shadow-bottom) {
          box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 15px !important;
        }
        :global(.align-baseline-middle) {
          vertical-align: -webkit-baseline-middle !important;
        }

        :global(.logo-navbar){
          height: 42px;
          width: auto;
        }
        @media only screen and (max-width: 425px){
          :global(.text-navbar){
            font-size: 16px;
          }
          :global(.logo-navbar){
            height: 32px;
            width: auto;
          }
          :global(.align-baseline-middle){
            vertical-align: unset !important;
          }
        }
      `}</style>
    </>
  );
};

export default CheckoutHeader;
