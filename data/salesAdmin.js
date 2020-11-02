import { Avatar } from 'antd'
import Image from 'next/image'
import formatNumber from 'lib/formatNumber'
import Media from 'react-bootstrap/Media'
import ProductList from 'components/Card/Admin/ProductList'

export const columns = [
  {
    key: 'invoice',
    title: 'No. Invoice',
    dataIndex: 'invoice',
  },
  {
    key: 'product',
    title: 'Produk',
    dataIndex: 'product',
    render: items => {
      return items.map((item, i) => (
        <ProductList key={i} item={item} />
      ))
    } 
  },
  {
    key: 'payment',
    title: 'Total Bayar',
    dataIndex: 'payment',
    render: data => (
      <>
        <p className="mb-n1">Rp. {formatNumber(data.total)}</p>
        <small className='text-secondary'>{data.method}</small>
      </>
    )
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: data => (
      <>
        <p className="mb-n1">{data.paymentStatus}</p>
        <small className='text-secondary'>Pembayaran sebelum {data.expired}</small>
      </>
    )
  },
  {
    key: 'deliveryService',
    title: 'Jasa Kirim',
    dataIndex: 'deliveryService',
  },
  {
    key: 'detail',
    title: 'Detail',
    dataIndex: 'detail',
  },
];

export const dataSource = [
  {
    key: '1',
    invoice: 'INV/20191002/XIX/X/375442105',
    product: [
      {
        name: 'Jaket GAP Grey',
        image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp',
        color: 'Hitam',
        size: 'M',
        amount: 2
      },
      {
        name: 'Flannel Uniqlo',
        image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp',
        color: 'Putih',
        size: 'S',
        amount: 4
      }
    ],
    payment: {
      total: 150000,
      method: 'Transfer Bank'
    },
    status: {
      paymentStatus: 'Belum Bayar',
      expired: '03-11-2020'
    },
    deliveryService: 'J&T Express',
    detail: 'Lihat Rincian',
  },
  {
    key: '2',
    invoice: 'INV/20191002/XIX/X/375442105',
    product: [
      {
        name: 'Flannel Uniqlo',
        image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp',
        color: 'Putih',
        size: 'S',
        amount: 4
      }
    ],
    payment: {
      total: 230000,
      method: 'Transfer Bank'
    },
    status: {
      paymentStatus: 'Belum Bayar',
      expired: '03-11-2020'
    },
    deliveryService: 'Pos Kilat Khusus',
    detail: 'Lihat Rincian',
  },
];
