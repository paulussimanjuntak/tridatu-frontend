import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout, Menu, Dropdown, Avatar, Badge, Grid, Drawer } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const useBreakpoint = Grid.useBreakpoint;

const routes = {
  umum: [
    {link: "/admin", text: "Dashboard", icon: "far fa-house-flood"},
    {link: "/", text: "Home", icon: "far fa-door-open"},
  ],
  pesanan: [
    {link: "/admin/sale?type=all", text: "Pesanan Saya", icon: "far fa-clipboard-list"},
  ],
  administrasi: [
    {link: "/admin/category", text: "Kategori", icon: "far fa-sitemap"},
    {link: "/admin/category/new", text: "Tambah Kategori", icon: "far fa-folder-tree"},
  ],
  produk: [
    {link: "/admin/products", text: "Produk Saya", icon: "far fa-shopping-bag"},
    {link: "/admin/products/new", text: "Tambah Produk", icon: "far fa-file-plus"},
  ],
  brand: [
    {link: "/admin/brand", text: "Brand", icon: "far fa-layer-group"},
    {link: "/admin/brand/new", text: "Tambah Brand", icon: "far fa-layer-plus"},
  ],
  promo: [
    {link: "/admin/voucher", text: "Voucher", icon: "far fa-ticket-alt"},
    {link: "/admin/voucher/new", text: "Tambah Voucher", icon: "far fa-money-check"},
  ],
}

const menu = (
  <Menu>
    <Menu.Item key="SignOut"> Keluar </Menu.Item>
  </Menu>
)

const isEmptyObject = obj => {
  return Object.keys(obj).length !== 0
}

const getActiveMenu = (routes, router) => {
  let getRoutes = routes.split('/')[2]
  let getRouter = router.split('/')[2]
  if(getRoutes) return getRoutes.startsWith(getRouter)
}

const AdminLayout = ({ children }) => {
  const router = useRouter()
  const screens = useBreakpoint()
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeMenu, setActiveMenu] = useState([""])
  const [breadcrumb, setBreadcrumb] = useState([{
    icon: {},
    title: "",
    menu: "",
  }])
  
  const onCollapse = () => {
    setCollapsed(!collapsed)
  }

  const onBreakpointChange = collapsed => {
    setCollapsed(collapsed)
  }

  const onSelectSiderMenu = e => {
    const groupTitle = e.item.props.text
    const menuName = e.item.node.innerText
    const icon = e.item.props.children[0]
    const finalTitle = groupTitle.charAt(0).toUpperCase() + groupTitle.slice(1)
    
    router.push(e.key, e.key)
    const data = {
      ...breadcrumb,
      title: finalTitle,
      icon: icon,
      menu: menuName,
    }
    setBreadcrumb([data])
  }

  const screenSize = () => {
    let mounted = true
    if((screens.xs) || (screens.sm && !screens.md) && mounted) setIsMobile(true)
    else if(screens.md && mounted) setIsMobile(false)
    else if(screens.lg && mounted) setIsMobile(false)
    else if(screens.xl && mounted) setIsMobile(false)
    else if(screens.xxl && mounted) setIsMobile(false)
    mounted = false
  }

  const SiderMenu = (collapsed) => (
    <Layout.Sider
      width={250}
      theme="light"
      breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={collapsed}
      onBreakpoint={!isMobile && onBreakpointChange}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        boxShadow: 'rgba(0,0,0,.05) 0px 0px 28px 0px'
      }}
    >

      <a href="/">
        <div className="brand">
          <div className="logo">
              <AnimatePresence key={collapsed}>
                <motion.img src="/tridatu-icon.png" alt="Tridatu Bali ID" 
                  transition={{ duration: ".2" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </AnimatePresence>
              <AnimatePresence>
              {!collapsed && (
                <motion.span 
                  transition={{ duration: ".3" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  exit={{ opacity: 0, width: "0" }}
                  className="text-dark font-weight-bold align-self-center align-baseline-middle pl-2"
                >
                  Tridatu <span className="text-muted font-weight-bold pl-1">Bali ID</span>
                </motion.span>
              )}
              </AnimatePresence>
          </div>
        </div>
      </a>

      <div className="sider-menu-container">
        <div className="sider-menu-child">
          <Menu
            mode="inline"
            theme="light"
            className="sider-menu"
            selectedKeys={activeMenu}
            onSelect={onSelectSiderMenu}
          >
            {Object.entries(routes).map(([key, val]) => (
              <Menu.ItemGroup 
                key={key} 
                className={`${collapsed && 'text-center'}`}
                title={<span className="font-weight-bold fs-12"> {key.toUpperCase()} </span>}
              >
                {val.map(route => (
                  <Menu.Item 
                    text={key}
                    key={route.link} 
                    icon={<i className={`${route.icon} menu-item-icon`} />}
                    className={isEmptyObject(router.query) && getActiveMenu(route.link, router.pathname) ? "text-left user-select-none ant-menu-item-selected" : "text-left user-select-none"}
                  >
                    {!collapsed && <>{route.text}</>}
                  </Menu.Item>
                ))}
              </Menu.ItemGroup>
            ))}
          </Menu>
        </div>
      </div>
    </Layout.Sider>
  )

  const rightMenu = [
    <Dropdown overlay={menu} placement="bottomCenter" key="user">
      <div className="nav-item-button">
        <Avatar size={40} src="https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp" />
      </div>
    </Dropdown>,
  ]

  rightMenu.unshift(
    <Dropdown overlay={menu} placement="bottomCenter" key="notification">
      <div className="nav-item-button">
        <Badge count={400} size="small" className="nav-notification">
          <i className="far fa-bell fa-lg" />
        </Badge>
      </div>
    </Dropdown>
  )

  useEffect(() => {
    screenSize()
  }, [screenSize])

  useEffect(() => {
    setActiveMenu([router.pathname])
  }, [router.pathname])

  return(
    <>
      <Layout style={{ minHeight: '100vh', marginBottom: "0" }}>
        {isMobile ? (
          <Drawer
            width={250}
            placement="left"
            closable={false}
            visible={isMobile && !collapsed}
            onClose={onCollapse}
            bodyStyle={{padding: 0}}
          >
            <>{SiderMenu(false)}</>
          </Drawer>
        ) : (
          <>{SiderMenu(collapsed)}</>
        )}

        <Layout className="mb-0 site-layout">
          <div className="p-t-64">
            <Layout.Header className={`site-layout-header p-0 ${collapsed ? 'header-collapsed' : 'header-fixed'}`}>
              <div 
                className="trigger-button mr-auto"
                onClick={onCollapse}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
              {rightMenu}
            </Layout.Header>

            <Layout.Content className={`layout-content ${collapsed ? 'content-collapsed' : 'content-fixed'}`}>
              {children}
            </Layout.Content>
          </div>
        </Layout>
      </Layout>

      <style jsx>{`

        :global(.site-layout .site-layout-header) {
          top: 0;
          right: 0;
          display: flex;
          position: fixed;
          background: #fff;
          align-items: center;
          box-shadow: 4px 4px 40px 0 rgba(0,0,0,.05);
          transition: width 0.2s;
          z-index: 2000;
        }
        :global(.header-fixed){
          width: calc(100% - 250px);
        }
        :global(.header-collapsed){
          width: calc(100% - 80px);
        }
        :global(.content-fixed){
          margin-left: 250px;
        }
        :global(.content-collapsed){
          margin-left: 80px;
        }
        :global(.layout-content){
          padding: 24px;
          transition: all .2s ease-out;
        }

        :global(.nav-item-button){
          height: 64px;
          width: auto;
          margin-right: 15px;
          padding: 0 10px;
          line-height: 64px;
          text-align: center;
          color: rgba(0,0,0,.75);
          cursor: pointer;
          transition: all .3s ease-out;
        }
        :global(.trigger-button){
          width: 64px;
          height: 64px;
          line-height: 64px;
          text-align: center;
          color: rgba(0,0,0,.75);
          cursor: pointer;
          transition: all .3s ease-out;
        }
        :global(.trigger-button:hover, .item-nav-button:hover){
          color: rgba(0,0,0,.95);
          background-color: #f9f9fc;
        }

        :global(.nav-notification){
          color: rgba(0,0,0,.5);
          font-size: 16px;
        }
        :global(.nav-notification .ant-badge-count-sm){
          font-size: 10px;
          min-width: 15px;
          height: 15px;
        }
        :global(.nav-notification .ant-badge-multiple-words){
          padding: 0 4px;
        }
        
        // LEFT SIDER
        :global(.brand){
          z-index: 1;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          box-shadow: 0 1px 9px -3px rgba(0, 0, 0, 0.2);
          top: 0;
          position: sticky;
        }
        :global(.logo){
          display: flex;
          align-items: center;
          justify-content: center;
        }
        :global(.logo img){
          width: 30px;
        }
        :global(.logo span){
          font-size: 16px;
          text-transform: uppercase;
          display: inline-block;
          font-weight: 700;
          white-space: nowrap;
          margin-bottom: 0;
          animation: fadeRightIn 300ms ease-in-out;
          animation-fill-mode: both;
        }
        :global(.menu-item-icon){
          width: 32px;
        }
        :global(.sider-menu-container){
          height: calc(100vh - 64px);
          overflow-x: hidden;
          flex: 1;
          padding: 24px 0;
        }
        :global(.sider-menu-child){
          position: relative;
          height: 100%;
        }
        :global(.sider-menu-child > .ant-menu){
          color: #000000b3;
        }
        :global(.sider-menu.ant-menu-vertical, .sider-menu.ant-menu-inline, .sider-menu.ant-menu-vertical-left){
          border-right: 0;
        }
        :global(.sider-menu:not(.ant-menu-horizontal) .ant-menu-item-selected){
          background-color: #cccccc66;
        }
        :global(.sider-menu .ant-menu-item:active, .sider-menu .ant-menu-submenu-title:active){
          background-color: #cccccc66;
        }
        :global(.sider-menu .ant-menu-item-selected){
          color: #444444;
          font-weight: 600;
        }
        :global(.sider-menu.ant-menu-vertical .ant-menu-item::after, 
                .sider-menu.ant-menu-vertical-left .ant-menu-item::after, 
                .sider-menu.ant-menu-vertical-right .ant-menu-item::after, 
                .sider-menu.ant-menu-inline .ant-menu-item::after){
          border-right: 3px solid #6c757d;
        }
        :global(.sider-menu .ant-menu-item:hover, 
                .sider-menu .ant-menu-item-active){
          color: #111111;
        }
        // LEFT SIDER

        @media (max-width: 767px) {
          :global(.header-fixed, .header-collapsed){
            width: 100%;
          }
          :global(.content-fixed, .content-collapsed){
            margin-left: 0px;
          }
          :global(.layout-content){
            padding: 0px;
          }
        }

        @keyframes fadeLeftIn {
          0% {
            transform: translateX(5px);
            opacity: 0;
          }

          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}

export default AdminLayout
