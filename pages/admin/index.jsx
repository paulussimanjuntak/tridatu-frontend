import { useRouter } from 'next/router'
import { Row, Col, Tooltip } from 'antd'

import Chart from 'chart.js'
import Card from 'react-bootstrap/Card'

import { chartOptions, parseOptions } from 'components/Chart/chart-pro'

const statsData = [
  { 
    title: "Belum Bayar", 
    value: 0, 
    link: "/admin/sale?type=unpaid",
    tooltipText: <span className="fs-12">Pesanan yang baru masuk dan belum dibayar.</span> 
  },
  { 
    title: "Perlu Dikirim", 
    value: 0, 
    link: "/admin/sale?type=toship",
    tooltipText: <span className="fs-12">Pesanan yang sudah dibayar dan belum dikirim ke pembeli.</span>
  },
  { 
    title: "Konfirmasi Pembatalan", 
    value: 0, 
    link: "/admin/sale?type=canceled",
    tooltipText: <span className="fs-12">Pesanan yang perlu dikonfirmasi untuk dibatalkan.</span>
  },
  { 
    title: "Ulasan Baru", 
    value: 0, 
    link: "/admin",
    tooltipText: <span className="fs-12">Jumlah ulasan dari pembeli yang belum kamu balas.</span>
  },
]

parseOptions(Chart, chartOptions());

const Dashboard = () => {
  const router = useRouter()

  return(
    <>
      <section className="dashboard-section">
        <div className="dashboard-container">
          <h4 className="fs-20-s mb-0">Penting hari ini</h4>
          <p className="fs-14 fs-12-s text-secondary">Aktivitas yang perlu kamu pantau untuk jaga kepuasan pembeli</p>

          <Row gutter={[16, 16]}>
            {statsData.map((data, i) => (
              <Col xl={6} lg={8} md={8} sm={12} xs={12} key={i}>
                <Card className="shadow-sm h-100 hover-pointer" onClick={() => router.push(data.link)}>
                  <Card.Body className="py-2 px-3">
                    <p className="fs-14 text-secondary fs-12-s">
                      <span className="pr-1">{data.title}</span>
                      <Tooltip placement="bottom" title={data.tooltipText}>
                        <i className="far fa-info-circle" />
                      </Tooltip>
                    </p>
                  </Card.Body>
                  <Card.Footer className="pt-0 pb-3 px-3 bg-white border-0">
                    <h3 className="align-self-center fs-22-s mb-0">{data.value}</h3>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div className="dashboard-container">
          <Card className="shadow">
            <Card.Header className="bg-transparent">
              <Row className="align-items-center">
                <Col>
                  <h6 className="text-uppercase ls-1 mb-1">Overview</h6>
                  <h2 className="mb-0">Total Visitors</h2>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <div className="chart">
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      <style jsx>{`
        @media(max-width: 767px) {
          :global(.dashboard-section){
            padding: 20px;
          }
        }
        .dashboard-container{
          margin-bottom: 20px;
        }
      `}</style>
    </>
  )
}

export default Dashboard
