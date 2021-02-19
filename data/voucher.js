import { Tooltip } from 'antd'

import ItemInfoPromo from "components/Card/Admin/Product/Promo/ItemInfo";
import ItemPricePromo from "components/Card/Admin/Product/Promo/ItemPrice";

export const columnsVoucher = [
  {
    key: 'code',
    title: (
      <span>
        Kode Voucher 
        <Tooltip title={<small className="noselect">Kode voucher mengandung Alfabet (A-Z) dan Angka (0-9)</small>}>
        <i className="fal fa-info-circle text-muted ml-1" />
        </Tooltip>
      </span>
    ),
    dataIndex: 'voucher',
    type: 'code',
    editable: true,
    // width: 250,
  },
  {
    key: 'kuota',
    title: (
      <span>
        Kuota Klaim
        <Tooltip title={<small className="noselect">Jumlah voucher dapat diklaim pengguna</small>}>
        <i className="fal fa-info-circle text-muted ml-1" />
        </Tooltip>
      </span>
    ),
    dataIndex: 'voucher',
    type: 'kuota',
    editable: true,
    // width: 250,
  },
  {
    key: 'min_transaction',
    title: (
      <span>
        Min. Transaksi
        <Tooltip title={<small className="noselect">Minimum transaksi dapat dikosongkan</small>}>
        <i className="fal fa-info-circle text-muted ml-1" />
        </Tooltip>
      </span>
    ),
    dataIndex: 'voucher',
    type: 'minimum',
    editable: true,
    // width: 250,
  },
  {
    key: 'nominal',
    title: 'Nominal/Persentase',
    dataIndex: 'voucher',
    type: 'nominal',
    editable: true,
    // width: 250,
  },
  {
    key: 'max_discount',
    title: 'Max. Discount',
    dataIndex: 'voucher',
    type: 'max_discount',
    editable: true,
    // width: 250,
  },
  {
    key: 'action',
    title: 'Aksi',
    align: 'center',
    type: 'action',
    editable: true,
    render: () => <a><i className="fal fa-trash-alt text-center" /></a>,
  }
]

export const columnsOngkir = [
  {
    key: 'code',
    title: (
      <span>
        Kode Voucher 
        <Tooltip title={<small className="noselect">Kode voucher mengandung Alfabet (A-Z) dan Angka (0-9)</small>}>
        <i className="fal fa-info-circle text-muted ml-1" />
        </Tooltip>
      </span>
    ),
    dataIndex: 'voucher',
    type: 'code',
    editable: true,
  },
  {
    key: 'kuota',
    title: (
      <span>
        Kuota Klaim
        <Tooltip title={<small className="noselect">Jumlah voucher dapat diklaim pengguna</small>}>
        <i className="fal fa-info-circle text-muted ml-1" />
        </Tooltip>
      </span>
    ),
    dataIndex: 'voucher',
    type: 'kuota',
    editable: true,
  },
  {
    key: 'min_transaction',
    title: 'Min. Transaksi',
    dataIndex: 'voucher',
    type: 'minimum',
    editable: true,
  },
  {
    key: 'action',
    title: 'Aksi',
    align: 'center',
    type: 'action',
    editable: true,
    render: () => <a><i className="fal fa-trash-alt text-center" /></a>,
  }
]

export const columnsVoucherProduct = [
  {
    title: "Produk",
    dataIndex: "products",
    key: "product",
    width: 270,
    ellipsis: true,
    render: (item) => (
      <ItemInfoPromo
        image={item.products_image_product}
        name={item.products_name}
        slug={item.products_slug}
      />
    ),
  },
  {
    title: "Harga",
    dataIndex: "products",
    key: "price",
    width: 180,
    ellipsis: true,
    render: (item) => (
      <ItemPricePromo
        discount={item.variants_discount}
        minPrice={+item.variants_min_price}
        maxPrice={+item.variants_max_price}
      />
    ),
  },
  {
    title: "Stok",
    dataIndex: "products",
    key: "stock",
    width: 150,
    align: "center",
    render: (item) => <p className="mb-0">{+item.stock}</p>,
  },
]
