import Container from 'react-bootstrap/Container'

let year = new Date()
year = year.getFullYear()

const Footer = () => {
  return(
    <>
      <footer>
        <hr className="mx-0 px-0" />
        <div className="row justify-content-around mb-0 pt-2 pb-0 ">
          <div className="col-11">
            <Container>
              <div className="row justify-content-center">

                <div className="col-md-12 col-lg-3 col-12 font-italic align-items-center mt-md-3 mt-4">
                  <h5>
                    <span>
                      <img src="/tridatu-icon.png" className="img-fluid mb-1 " />
                    </span>
                    <b className="text-dark">
                      Tridatu<span className="text-muted"> Bali ID</span>
                    </b>
                  </h5>
                  <p className="social mt-3 mb-3">
                    <span>
                      <i className="fab fa-facebook-square" />
                    </span>
                    <span>
                      <i className="fab fa-instagram-square" />
                    </span>
                    <span>
                      <i className="fab fa-twitter-square" />
                    </span>
                    <span>
                      <i className="fab fa-google-plus-square" />
                    </span>
                  </p>
                  <small className="copy-rights cursor-pointer">
                    Ⓒ {year} Tridatu Bali ID
                  </small>
                  <br />
                  <small>All Right Reserved</small>
                </div>

                <div className="col-md-12 col-lg-3 col-12 my-0">
                  <ul className="list-unstyled">
                    <li className="mt-md-3 mt-4">Kontak</li>
                    <li>
                      <i className="far fa-phone-alt mr-2" />
                      +628113885929
                    </li>
                    <li>
                      <i className="far fa-envelope mr-2" />
                      support@tridatu-bali.id
                    </li>
                    <li>
                      Jl. Muding Tengah, Bougenville No. 18 Kerobokan, Kuta Utara,
                      Badung, Bali 80361
                    </li>
                  </ul>
                </div>

                <div className="col-md-12 col-lg-3 col-12 my-sm-0 mt-5 mt-0-s">
                  <ul className="list-unstyled ml-5 ml-0-s">
                    <li className="mt-md-3 mt-4">Informasi</li>
                    <li>Tentang Kami</li>
                    <li>Panduan Belanja</li>
                    <li>Syarat &amp; Ketentuan</li>
                    <li>Kebijakan Privasi</li>
                  </ul>
                </div>

                <div className="col-md-12 col-lg-3 col-12 my-sm-0 mt-5 mt-0-s">
                  <ul className="list-unstyled multi-bank">
                    <li className="mt-md-3 mt-4 mb-2">Metode Pengiriman</li>
                    <div className="img-bank">
                      <img
                        src="https://www.gramedia.com/assets/bank/payment-mandiri.png"
                        className="w-48"
                        alt="tridatu-bali"
                      />
                      <img
                        src="https://www.gramedia.com/assets/bank/payment-permata.png"
                        className="w-48"
                        alt="tridatu-bali"
                      />
                      <img
                        src="https://www.gramedia.com/assets/bank/payment-bni.png"
                        className="w-48"
                        alt="tridatu-bali"
                      />
                      <img
                        src="https://www.gramedia.com/assets/bank/payment-bri.png"
                        className="w-48"
                        alt="tridatu-bali"
                      />
                      <img
                        src="https://www.gramedia.com/assets/bank/payment-bca.png"
                        className="w-48"
                        alt="tridatu-bali"
                      />
                      <img
                        src="https://www.gramedia.com/assets/bank/payment-go-pay.png"
                        className="w-48"
                        alt="tridatu-bali"
                      />
                      <img
                        src="https://www.gramedia.com/assets/bank/payment-ovo.png"
                        className="w-48"
                        alt="tridatu-bali"
                      />
                    </div>
                  </ul>
                  <ul className="list-unstyled multi-bank">
                    <li className="mt-md-3 mt-4 mb-2">Metode Pengiriman</li>
                    <div className="img-bank">
                      <img
                        src="https://www.gramedia.com/assets/shipping/shipping-kg-logistik.png"
                        className="w-48"
                        alt="tridatu-bali"
                      />
                      <img
                        src="https://www.gramedia.com/assets/shipping/shipping-pick-up-in-store.png"
                        className="w-48"
                        alt="tridatu-bali"
                      />
                      <img
                        src="https://www.gramedia.com/assets/shipping/shipping-grab.png"
                        className="w-48"
                        alt="tridatu-bali"
                      />
                    </div>
                  </ul>
                </div>

              </div>
            </Container>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        .fab {
          cursor: pointer;
          font-size: 25px;
          margin: 5px 5px 5px 10px !important;
        }

        .social {
          position: relative;
          left: -10px;
        }

        .cursor-pointer {
          cursor: pointer !important;
          color: green;
          font-weight: bold;
        }

        h5 {
          font-size: calc(
            20px + (28 - 20) * ((100vw - 360px) / (1600 - 360))
          ) !important;
        }

        li {
          margin-top: 10px;
          margin-bottom: 10px;
        }

        img {
          vertical-align: middle !important;
          width: 100%;
          height: auto;
          width: calc(17px + 6 * ((100vw - 320px) / 680));
        }

        li:first-child {
          font-size: 21px !important;
          font-weight: bold;
          margin-bottom: calc(
            20px + (48 - 40) * ((100vw - 360px) / (1600 - 360))
          );
          color: #757575 !important;
        }

        footer {
          color: #757575 !important;
        }
        .w-48 {
          width: 48px !important;
          height: 48px !important;
          margin: 0px 2px;
        }
        .img-bank {
          display: flex;
          flex-wrap: wrap;
        }
        .multi-bank {
          max-width: 216px;
        }

        /* Medium devices (tablets, less than 992px) */
        @media (max-width: 991.98px) {
          .ml-0-s {
            margin-left: 0!important;
          }
          .mt-0-s {
            margin-top: 0!important;
          }
        }
      `}</style>
    </>
  )
}

export default Footer
