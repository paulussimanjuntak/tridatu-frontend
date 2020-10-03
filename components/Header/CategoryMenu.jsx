import { Tabs } from 'antd';
import Link from 'next/link';

import { category_data } from './data'

const CategoryMenu = () => {
  return(
    <>
      <Tabs 
        tabBarGutter={10}
        tabPosition="left" 
        defaultActiveKey="1" 
        className="category-item-navbar-tabs-left" 
      >
        {category_data.map(data => (
          <Tabs.TabPane tab={data.category} key={data.category}>
            <div className="westeros-c-column-container">
              {data.sub.map(child => (
                <div className="westeros-c-column-container_item" key={child.title}>
                  <b className="fs-16">{child.title}</b>
                  {child.child.map((dataChild,i) => (
                    <p className="mb-0 text-dark" key={i}>
                      <Link href="/products" as="/products">
                        <a className="text-reset"> {dataChild} </a>
                      </Link>
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </>
  )
}

export default CategoryMenu
