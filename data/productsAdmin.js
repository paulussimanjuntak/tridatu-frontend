import { Space, Avatar, Tooltip } from 'antd'
import Button from 'antd-button-color';

export const productsColumns = [
  {
    fixed: 'left',
    title: 'Nama Produk',
    dataIndex: 'product',
    key: 'product',
    render: item => (
      <a className="text-truncate text-dark align-middle text-decoration-none">
        <Avatar size={64} shape="square" src={item.image} />
        <br />
        <span className="align-middle text-wrap">{item.name}</span>
      </a>
    ),
  },
  {
    title: 'Harga',
    dataIndex: 'price',
    key: 'price',
    render: price => 'Rp.' + price,
  },
  {
    title: 'Variasi',
    dataIndex: 'variation',
    key: 'variation',
    render: items => {
      return items.map(item => {
        return item.detail.map(data => <p key={data.size}>{item.color}, {data.size}</p>)
      })
    }
  },
  {
    title: 'Stok' ,
    dataIndex: 'variation',
    key: 'stock',
    render: items => {
      return items.map(item => {
        return item.detail.map(data => <p key={data.size}>{data.stock}</p>)
      })
    }
  },
  {
    title: 'Penjualan',
    dataIndex: 'variation',
    key: 'sales',
    render: items => {
      return items.map(item => {
        return item.detail.map(data => <p key={data.size}>{data.sales}</p>)
      })
    }
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="small">
        <Tooltip title="Ubah">
          <Button size="small" type="primary" ghost icon={<i className="fal fa-edit" />} />
        </Tooltip>
        <Tooltip title="Tampilkan">
          <Button size="small" type="success" ghost icon={<i className="fal fa-eye" />} />
        </Tooltip>
        <Tooltip title="Hapus">
          <Button size="small" danger ghost icon={<i className="fal fa-trash-alt" />} />
        </Tooltip>
      </Space>
    ),
  },
];

export const productsData = [
  {
    key: '1',
    product: {
      name: 'Jaket GAP Grey',
      image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp'
    },
    price: '200.000',
    variation: [
      { 
        color: 'Putih', 
        detail: [
          { size: 'S', stock: 3, sales: 0 },
          { size: 'M', stock: 9, sales: 3 },
          { size: 'L', stock: 1, sales: 1 },
          { size: 'XL', stock: 8, sales: 0 },
        ],  
      },
      { 
        color: 'Hitam', 
        detail: [
          { size: 'S', stock: 3, sales: 0 },
          { size: 'M', stock: 9, sales: 3 },
          { size: 'L', stock: 1, sales: 1 },
          { size: 'XL', stock: 8, sales: 0 },
        ],  
      },
    ],
  },
  {
    key: '2',
    product: {
      name: 'Flannel Uniqlo',
      image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp'
    },
    price: '450.000',
    variation: [
      { 
        color: 'Merah', 
        detail: [
          { size: 'S', stock: 0, sales: 9 },
          { size: 'XL', stock: 1, sales: 2 },
        ],  
      },
      { 
        color: 'Biru', 
        detail: [
          { size: 'S', stock: 3, sales: 0 },
          { size: 'XL', stock: 8, sales: 0 },
        ],  
      },
    ],
  },
];

