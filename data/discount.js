import { Switch, InputNumber } from 'antd'

import formatNumber from 'lib/formatNumber'

import ItemInfoPromo from 'components/Card/Admin/Product/Promo/ItemInfo'
import ItemPricePromo from 'components/Card/Admin/Product/Promo/ItemPrice'
import ItemPeriodPromo from 'components/Card/Admin/Product/Promo/ItemPeriod'
import ItemStatusPromo from 'components/Card/Admin/Product/Promo/ItemStatus'

export const orderList = [
  { name: "Semua Status", value: "all"},
  { name: "Sedang Berjalan", value: "running" },
  { name: "Akan Datang", value: "comming" },
  { name: "Tidak Aktif", value: "nonaktif" },
]

export const columns = [
  {
    title: 'Produk',
    dataIndex: 'products',
    key: 'product',
    width: 250,
    ellipsis: true,
    render: item => <ItemInfoPromo image={item.products_image_product} name={item.products_name} slug={item.products_slug} />
  },
  {
    title: 'Harga',
    dataIndex: 'products',
    key: 'price',
    width: 200,
    ellipsis: true,
    render: item => <ItemPricePromo discount={item.products_discount} price={item.variants_price} />
  },
  {
    title: 'Periode Diskon',
    dataIndex: 'products',
    key: 'period',
    width: 200,
    ellipsis: true,
    render: item => <ItemPeriodPromo active={item.promo_active} start={item.promo_start} end={item.promo_end} />
  },
  {
    title: 'Status',
    dataIndex: 'products',
    key: 'status',
    width: 200,
    ellipsis: true,
    render: item => <ItemStatusPromo statusPromo={item.promo_status} />
  },
  {
    title: 'Aksi',
    dataIndex: 'products',
    key: 'action',
    width: 200,
    action: true,
  },
]




/* ################## */
/* ################## */
export const columnsProductNoVariant = [
  {
    title: 'Harga Normal',
    dataIndex: 'product',
    key: 'price',
    align: 'center',
    render: item => <p className="mb-0"> Rp.{formatNumber(item.normal_price.value)} </p>
  },
  {
    title: 'Harga Diskon',
    dataIndex: 'product',
    key: 'discount_price',
    align: 'center',
    editable: true,
    type: 'price',
    width: 150,
  },
  {
    title: 'Diskon (%)',
    dataIndex: 'product',
    key: 'discount',
    align: 'center',
    editable: true,
    type: 'discount',
    width: 120,
  },
  {
    title: 'Stok',
    dataIndex: 'product',
    key: 'stock',
    width: 120,
    align: 'center',
    render: item => <p className="mb-0">{item.stock.value}</p>
  },
  {
    title: 'Aktif/Nonaktif',
    dataIndex: 'product',
    key: 'active',
    align: 'center',
    editable: true,
    type: 'active',
  },
]

export const columnsProductVariant = [
  {
    title: 'Variasi',
    colSpan: 0,
    dataIndex: 'product',
    key: 'variant',
    align: 'center',
    render: item => (
      <>
        {item.va2_option ? (
          <p className="mb-0">{item.va1_option.value}, {item.va2_option.value}</p>
        ) : (
          <p className="mb-0">{item.va1_option.value}</p>
        )}
      </>
    )
  },
  {
    title: 'Harga Normal',
    colSpan: 2,
    dataIndex: 'product',
    key: 'price',
    align: 'center',
    render: item => <p className="mb-0"> Rp.{formatNumber(item.normal_price.value)} </p>
  },
  {
    title: 'Harga Diskon',
    dataIndex: 'product',
    key: 'discount_price',
    align: 'center',
    editable: true,
    type: 'price',
    width: 150,
  },
  {
    title: 'Diskon (%)',
    dataIndex: 'product',
    key: 'discount',
    align: 'center',
    editable: true,
    type: 'discount',
    width: 120,
  },
  {
    title: 'Stok',
    dataIndex: 'product',
    key: 'stock',
    width: 120,
    align: 'center',
    render: item => <p className="mb-0">{item.stock.value}</p>
  },
  {
    title: 'Aktif/Nonaktif',
    dataIndex: 'product',
    key: 'active',
    align: 'center',
    editable: true,
    type: 'active',
  },
]












/* ################## */

export const columnsProductUpdate = [
  {
    title: 'Variasi',
    colSpan: 0,
    dataIndex: 'variant',
    key: 'variant',
    align: 'center',
    render: item => (
      <p className="mb-0">{item.var1}, {item.var2}</p>
    )
  },
  {
    title: 'Harga Normal',
    colSpan: 2,
    dataIndex: 'price',
    key: 'price',
    align: 'center',
    render: item => (
      <p className="mb-0">
        <span></span>
        Rp.{formatNumber(item.price)}
      </p>
    )
  },
  {
    title: 'Harga Diskon',
    dataIndex: 'price',
    key: 'discount_price',
    align: 'center',
    width: 150,
    render: item => (
      <div className="ant-input-group-wrapper">
        <div className="ant-input-wrapper ant-input-group input-group-variant" style={{ zIndex: 1 }}>
          <span className={`ant-input-group-addon noselect fs-12 bg-transparent`}>Rp</span>
          <InputNumber
            min={1}
            name="price"
            placeholder="Masukkan harga"
            value={item.price}
            className="w-100 bor-left-rad-0 h-33-custom-input fs-12 input-number-variant"
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            parser={value => value.replace(/\Rp\s?|(\.*)/g, '')}
          />
        </div>
      </div>
    )
  },
  {
    title: 'Diskon (%)',
    dataIndex: 'price',
    key: 'discount',
    align: 'center',
    width: 120,
    render: item => (
      <div className="ant-input-group-wrapper">
        <div className="ant-input-wrapper ant-input-group input-group-variant" style={{ zIndex: 1 }}>
          <InputNumber
            min={1}
            name="price"
            placeholder="Masukkan harga"
            value={item.discount}
            className="w-100 bor-right-rad-0 h-33-custom-input fs-12 input-number-variant"
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            parser={value => value.replace(/\Rp\s?|(\.*)/g, '')}
          />
          <span className={`ant-input-group-addon noselect fs-12 bg-transparent`}>%</span>
        </div>
      </div>
    )
  },
  {
    title: 'Stok',
    dataIndex: 'stock',
    key: 'stock',
    width: 120,
    align: 'center',
    render: item => (
      <p className="mb-0">{item}</p>
    )
  },
  {
    title: 'Aktif/Nonaktif',
    dataIndex: 'active',
    key: 'active',
    align: 'center',
    render: item => (
      <Switch defaultChecked={item} />
    )
  },
]

export const dataSourceProductUpdate = [
  {
    key: '1',
    product: {
      name: "Baju Bekas",
    },
    variant: {
      var1: "Putih",
      var2: "S",
      discount: 50,
      price: 200000,
    },
    status: "Tidak Aktif",
    price: {
      discount: 50,
      price: 200000,
    },
    stock: 10,
    active: true
  },
  {
    key: '2',
    product: {
      name: "Baju Bekas",
    },
    variant: {
      var1: "Putih",
      var2: "M",
      discount: 50,
      price: 200000,
    },
    status: "Tidak Aktif",
    price: {
      discount: 50,
      price: 200000,
    },
    stock: 10,
    active: true
  },
  {
    key: '3',
    product: {
      name: "Baju Bekas",
    },
    variant: {
      var1: "Hitam",
      var2: "S",
      discount: 50,
      price: 200000,
    },
    status: "Tidak Aktif",
    price: {
      discount: 50,
      price: 200000,
    },
    stock: 10,
    active: true
  },
  {
    key: '4',
    product: {
      name: "Baju Bekas",
    },
    variant: {
      var1: "Hitam",
      var2: "M",
      discount: 50,
      price: 200000,
    },
    status: "Tidak Aktif",
    price: {
      discount: 50,
      price: 200000,
    },
    stock: 10,
    active: true
  },
  {
    key: '5',
    product: {
      name: "Baju Bekas",
    },
    variant: {
      var1: "Merah",
      var2: "S",
      discount: 50,
      price: 200000,
    },
    status: "Tidak Aktif",
    price: {
      discount: 50,
      price: 200000,
    },
    stock: 10,
    active: false
  },
  {
    key: '6',
    product: {
      name: "Baju Bekas",
    },
    variant: {
      var1: "Merah",
      var2: "M",
      discount: 50,
      price: 200000,
    },
    status: "Tidak Aktif",
    price: {
      discount: 50,
      price: 200000,
    },
    stock: 10,
    active: false
  },
]
