import Link from 'next/link'
import formatNumber from 'lib/formatNumber'
import ProductList from 'components/Card/Admin/ProductList'

export const columns = [
  {
    key: 'invoice',
    title: 'No. Invoice',
    dataIndex: 'invoice',
    width: 100,
  },
  {
    key: 'product',
    title: 'Produk',
    dataIndex: 'product',
    width: 300,
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
    width: 150,
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
    width: 250,
    render: data => (
      <>
        <p className="mb-n1">{data.paymentStatus}</p>
        <small className='text-secondary'>{data.expired}</small>
      </>
    )
  },
  {
    key: 'deliveryService',
    title: 'Jasa Kirim',
    dataIndex: 'deliveryService',
    width: 150,
  },
  {
    key: 'detail',
    title: 'Detail',
    dataIndex: 'orderId',
    width: 150,
    render: orderId => (
      <Link href="sale/[orderId]" as={`sale/${orderId}`}>
        <a href={`sale/${orderId}`} target="_blank" className="text-tridatu">Lihat Rincian</a>
      </Link>
    ),
  },
];

export const dataSource = [
  {
    key: '1',
    orderId: 58020916256845,
    invoice: 'INV/20191002/XIX/X/375442105',
    product: [
      {
        name: 'Jaket GAP Grey Jaket GAP Grey',
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
      paymentStatus: 'Perlu Dikirim',
      expired: 'Kirimkan sebelum 05-11-2020'
    },
    deliveryService: 'J&T Express',
  },
  {
    key: '2',
    orderId: 58019368521176,
    invoice: '-',
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
      method: 'Indomaret'
    },
    status: {
      paymentStatus: 'Belum Bayar',
      expired: 'Pembayaran sebelum 03-11-2020'
    },
    deliveryService: 'Pos Kilat Khusus',
  },
];

// ############################## //

export const dataSourceWaiting = [
  {
    key: '1',
    orderId: 58019368521176,
    invoice: '-',
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
      method: 'Indomaret'
    },
    status: {
      paymentStatus: 'Belum Bayar',
      expired: 'Pembayaran sebelum 03-11-2020'
    },
    deliveryService: 'Pos Kilat Khusus',
  },
];

// ############################## //

export const dataSourceToship = [
  {
    key: '1',
    orderId: 58020916256845,
    invoice: 'INV/20191002/XIX/X/375442105',
    product: [
      {
        name: 'Jaket GAP Grey Jaket GAP Grey',
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
      paymentStatus: 'Perlu Dikirim',
      expired: 'Kirimkan sebelum 05-11-2020'
    },
    deliveryService: 'J&T Express',
  }
];

// ############################## //
// ############################## //
//   SALES DETAIL PAGES PRODUCT   //
// ############################## //
// ############################## //

export const dataSourceDetail = [
  {
    key: '1',
    no: 1,
    product: {
      name: 'Jaket GAP Grey',
      image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp',
      color: 'Hitam',
      size: 'M',
    },
    price: 150000,
    amount: 2,
    subtotal: 300000,
  },
  {
    key: '2',
    no: 2,
    product: {
      name: 'Flannel Uniqlo',
      image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp',
      color: 'Hitam',
      size: 'M',
    },
    price: 230000,
    amount: 1,
    subtotal: 230000,
  },
];

export const columnsDetail = [
  {
    key: 'no',
    title: 'No.',
    dataIndex: 'no',
    width: 50,
  },
  {
    key: 'product',
    title: 'Produk',
    dataIndex: 'product',
    render: item => <ProductList item={item} />
  },
  {
    key: 'price',
    title: 'Harga Satuan',
    dataIndex: 'price',
    width: 150,
    align: 'right',
    render: price => <p className="mb-n1">Rp. {formatNumber(price)}</p>
  },
  {
    key: 'amount',
    title: 'Jumlah',
    dataIndex: 'amount',
    width: 80,
    align: 'right',
    render: text => <span className="text-center">{text}</span>
  },
  {
    key: 'subtotal',
    title: 'Subtotal',
    dataIndex: 'subtotal',
    width: 120,
    align: 'right',
    render: price => <p className="mb-n1">Rp. {formatNumber(price)}</p>
  },
];

// ############################## //
// ############################## //
//     DASHBOARD PAGES PRODUCT    //
// ############################## //
// ############################## //

export const dataSourceBestProduct = [
  {
    key: '1',
    product: {
      name: 'Jaket GAP Grey',
      image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp',
      color: 'Hitam',
      size: 'M',
    },
    sold: 12,
    stock: 30,
  },
  {
    key: '2',
    product: {
      name: 'Kemeja Converse',
      image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp',
      color: 'Kuning',
      size: 'XL',
    },
    sold: 8,
    stock: 3,
  },
  {
    key: '3',
    product: {
      name: 'Jaket Boomber',
      image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp',
      color: 'Hijau Army',
      size: 'L',
    },
    sold: 3,
    stock: 1,
  },
  {
    key: '4',
    product: {
      name: 'Flannel Uniqlo',
      image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp',
      color: 'Putih',
      size: 'L',
    },
    sold: 1,
    stock: 23,
  },
];

export const columnsBestProduct = [
  {
    key: 'product',
    title: 'Produk',
    dataIndex: 'product',
    width: 100,
    render: item => <ProductList item={item} />
  },
  {
    key: 'sold',
    title: 'Terjual',
    dataIndex: 'sold',
    width: 80,
    align: 'center',
    render: text => <span className="text-center">{text}</span>
  },
  {
    key: 'stock',
    title: 'Stok',
    dataIndex: 'stock',
    width: 80,
    align: 'center',
    render: text => <span className="text-center">{text}</span>
  },
];
