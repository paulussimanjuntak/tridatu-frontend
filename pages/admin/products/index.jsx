import Card from 'react-bootstrap/Card'
import { Tabs } from 'antd'

const ALL = 'all'
const LIVE = 'live'
const SOLDOUT = 'soldout'

const Products = () => {
  return(
    <>
      <Tabs className="order-tabs">
        <Tabs.TabPane tab="Semua" key={ALL}>
          <p>all</p>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Live" key={LIVE}>
          <p>live</p>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Habis" key={SOLDOUT}>
          <p>soldout</p>
        </Tabs.TabPane>
      </Tabs>
    </>
  )
}

export default Products
