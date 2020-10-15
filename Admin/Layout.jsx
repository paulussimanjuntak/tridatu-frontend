import { useState } from 'react';
import { Layout, Menu } from 'antd';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const routes = [
  {link: "/admin/category", text: "Kategori", icon: "layer-group"},
  {link: "/admin/brand", text: "Brand", icon: "layer-group"},
  {link: "/admin/promo", text: "Promo", icon: "layer-group"},
]

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  
  const onCollapse = value => {
    setCollapsed(value)
  }

  return(
    <>
      <Layout style={{ minHeight: '100vh', marginBottom: "0" }}>
        <Layout.Sider 
          collapsible 
          collapsed={collapsed} 
          onCollapse={onCollapse} 
          className="d-none d-md-block sider-admin"
        >
          <div className="logo" />
          <Menu 
            theme="dark" 
            mode="inline"
            onClick={(item, key) => console.log(item, key)}
          >
          <Navbar.Brand href="/" className="font-italic">
            <span className="font-weight-bold align-self-center align-baseline-middle pl-1 text-navbar">
              Tridatu
              <span className="font-weight-bold text-navbar"> Bali ID</span>
            </span>
          </Navbar.Brand>
            {routes.map(route => (
              <Menu.Item key={route.link} icon={<i className={`far fa-${route.icon} pr-2`} />}>{route.text}</Menu.Item>
            ))}

          </Menu>
        </Layout.Sider>

        <Layout className="mb-0">
          <Layout.Content>
            <Container fluid="md">
              {children}
            </Container>
          </Layout.Content>
        </Layout>
      </Layout>

      <style jsx>{`
        :global(.sider-admin){
          overflow: auto;
          height: 100vh;
          left: 0;
        }
      `}</style>
    </>
  )
}

export default AdminLayout
