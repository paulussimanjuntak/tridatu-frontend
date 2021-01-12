import { Tabs } from 'antd';
import { useSelector } from "react-redux";
import Link from 'next/link';

const CategoryMenu = () => {
  const allCategories = useSelector(state => state.categories.allCategories)

  return(
    <>
      <Tabs 
        tabBarGutter={10}
        tabPosition="left" 
        defaultActiveKey="1" 
        className="category-item-navbar-tabs-left" 
      >
        {allCategories.map(category => (
          <Tabs.TabPane tab={category.categories_name} key={category.categories_id}>
            <div className="westeros-c-column-container">
              {category.sub_categories.map(sub => (
                <div className="westeros-c-column-container_item" key={sub.sub_categories_id}>
                  <b className="fs-14">{sub.sub_categories_name}</b>
                  {sub.item_sub_categories.map(item => (
                    <p className="m-b-3 text-dark" key={item.item_sub_categories_id}>
                      <Link href="/products" as="/products">
                        <a className="text-reset"> {item.item_sub_categories_name} </a>
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
