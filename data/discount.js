import { Switch, InputNumber } from "antd";

import formatNumber from "lib/formatNumber";

import ItemInfoPromo from "components/Card/Admin/Product/Promo/ItemInfo";
import ItemPricePromo from "components/Card/Admin/Product/Promo/ItemPrice";
import ItemPeriodPromo from "components/Card/Admin/Product/Promo/ItemPeriod";
import ItemStatusPromo from "components/Card/Admin/Product/Promo/ItemStatus";

export const orderList = [
  { name: "Semua Status", value: "all" },
  { name: "Sedang Berjalan", value: "running" },
  { name: "Akan Datang", value: "comming" },
  { name: "Tidak Aktif", value: "nonaktif" },
];

export const columns = [
  {
    title: "Produk",
    dataIndex: "products",
    key: "product",
    width: 250,
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
    width: 200,
    ellipsis: true,
    render: (item) => (
      <ItemPricePromo
        discount={item.variants_discount}
        minPrice={item.variants_min_price}
        maxPrice={item.variants_max_price}
      />
    ),
  },
  {
    title: "Periode Diskon",
    dataIndex: "products",
    key: "period",
    width: 200,
    ellipsis: true,
    render: (item) => (
      <ItemPeriodPromo
        statusPromo={item.products_discount_status}
        start={item.products_discount_start}
        end={item.products_discount_end}
      />
    ),
  },
  {
    title: "Status",
    dataIndex: "products",
    key: "status",
    width: 200,
    ellipsis: true,
    render: (item) => <ItemStatusPromo statusPromo={item.products_discount_status} />,
  },
  {
    title: "Aksi",
    dataIndex: "products",
    key: "action",
    width: 200,
    action: true,
  },
];

/* ################## */
/* ################## */
export const columnsProductNoVariant = [
  {
    title: "Harga Normal",
    dataIndex: "product",
    key: "price",
    align: "center",
    render: (item) => (
      <p className="mb-0"> Rp.{formatNumber(item.normal_price.value)} </p>
    ),
  },
  {
    title: "Harga Diskon",
    dataIndex: "product",
    key: "discount_price",
    align: "center",
    editable: true,
    type: "price",
    width: 150,
  },
  {
    title: "Diskon (%)",
    dataIndex: "product",
    key: "discount",
    align: "center",
    editable: true,
    type: "discount",
    width: 120,
  },
  {
    title: "Stok",
    dataIndex: "product",
    key: "stock",
    width: 120,
    align: "center",
    render: (item) => <p className="mb-0">{item.stock.value}</p>,
  },
  {
    title: "Aktif/Nonaktif",
    dataIndex: "product",
    key: "active",
    align: "center",
    editable: true,
    type: "active",
  },
];

export const columnsProductVariant = [
  {
    title: "Variasi",
    colSpan: 0,
    dataIndex: "product",
    key: "variant",
    align: "center",
    render: (item) => (
      <>
        {item.va2_option ? (
          <p className="mb-0">
            {item.va1_option.value}, {item.va2_option.value}
          </p>
        ) : (
          <p className="mb-0">{item.va1_option.value}</p>
        )}
      </>
    ),
  },
  {
    title: "Harga Normal",
    colSpan: 2,
    dataIndex: "product",
    key: "price",
    align: "center",
    render: (item) => (
      <p className="mb-0"> Rp.{formatNumber(item.normal_price.value)} </p>
    ),
  },
  {
    title: "Harga Diskon",
    dataIndex: "product",
    key: "discount_price",
    align: "center",
    editable: true,
    type: "price",
    width: 150,
  },
  {
    title: "Diskon (%)",
    dataIndex: "product",
    key: "discount",
    align: "center",
    editable: true,
    type: "discount",
    width: 120,
  },
  {
    title: "Stok",
    dataIndex: "product",
    key: "stock",
    width: 120,
    align: "center",
    render: (item) => <p className="mb-0">{item.stock.value}</p>,
  },
  {
    title: "Aktif/Nonaktif",
    dataIndex: "product",
    key: "active",
    align: "center",
    editable: true,
    type: "active",
  },
];

/* ################## */










export const dataNoVar = {
  products_id: 1,
  products_name: "KEMEJA LAPANGAN / KEMEJA PDL / KEMEJA OUTDOOR",
  products_slug: "kemeja-lapangan-kemeja-pdl-kemeja-outdoor",
  products_desc: "aaaaaaaaaaaaaaaaaaaa",
  products_condition: true,
  products_image_product: {
    0: "b1ccd10086e94c9db58a31f37ecd96f5.jpeg",
    1: "2f2f7bfd3aef413e871dfd8ce89e522a.jpeg",
    2: "0732cbb0b0a04c6fbfe1a0b60e018049.jpeg",
    3: "5efdda17d560450bba89d9a65637fc08.jpeg",
    4: "6d67871b794d417da816fe3106d28c98.jpeg",
  },
  products_weight: 500,
  products_live: false,
  products_visitor: 0,
  products_category: {
    categories_id: 1,
    categories_name: "Pria",
    sub_categories_id: 1,
    sub_categories_name: "Atasan",
    item_sub_categories_id: 3,
    item_sub_categories_name: "Kemeja",
  },
  products_brand: {
    brands_id: 1,
    brands_name: "nike",
    brands_image: "f0025b3e2bb94e3a8834e2d30e5759b9.jpeg",
  },
  products_variant: {
    va1_items: [
      {
        va1_id: 1,
        va1_price: 75000,
        va1_stock: 1,
        va1_code: "1271521-899-SM",
        va1_barcode: "889362033471",
        va1_discount: 20,
        va1_discount_active: true,
      },
    ],
  },
  products_wholesale: [],
  products_created_at: "2021-01-29T18:09:11.983920",
  products_updated_at: "2021-01-29T18:09:11.983920",
};

export const dataVar1 = {
  products_id: 2,
  products_name: "PAULMAY Sepatu Formal Pria Modena 01 - Hitam",
  products_slug: "paulmay-sepatu-formal-pria-modena-01-hitam",
  products_desc: "aaaaaaaaaaaaaaaaaaaa",
  products_condition: false,
  products_image_product: {
    0: "1c8ca566db29443ab9a38661440c50ae.jpeg",
    1: "5b5f66c29abf445e8c5e3922380fc861.jpeg",
    2: "a1012d94145d4b2d8874672e8a48ffd4.jpeg",
    3: "fab4c37787b14369b7813e7e0ac1d857.jpeg",
    4: "8689ac8eb809458c87eb4a64485b879f.jpeg",
  },
  products_weight: 1000,
  products_preorder: 20,
  products_live: false,
  products_visitor: 0,
  products_category: {
    categories_id: 1,
    categories_name: "Pria",
    sub_categories_id: 1,
    sub_categories_name: "Atasan",
    item_sub_categories_id: 1,
    item_sub_categories_name: "Jas",
  },
  products_brand: {},
  products_variant: {
    va1_name: "Ukuran",
    va1_items: [
      {
        va1_id: 2,
        va1_option: "39",
        va1_price: 217000,
        va1_stock: 1,
        va1_discount: 30,
        va1_discount_active: true,
        va1_image: "df6e162453e1484bb1d31cf7874bfa6f.jpeg",
      },
      {
        va1_id: 3,
        va1_option: "40",
        va1_price: 370000,
        va1_stock: 10,
        va1_discount: 50,
        va1_discount_active: true,
        va1_image: "2fae93661fff416fadbc3416949fc03d.jpeg",
      },
      {
        va1_id: 4,
        va1_option: "41",
        va1_price: 124000,
        va1_stock: 1,
        va1_discount: 0,
        va1_discount_active: false,
        va1_image: "9edbbd1810e7485fbd1872ec8aeefee1.jpeg",
      },
    ],
  },
  products_wholesale: [],
  products_created_at: "2021-01-29T18:09:14.482518",
  products_updated_at: "2021-01-29T18:09:14.482518",
};

export const dataVar2 = {
  products_id: 3,
  products_name: "IPHONE XR",
  products_slug: "iphone-xr",
  products_desc: "aaaaaaaaaaaaaaaaaaaa",
  products_condition: true,
  products_image_product: {
    0: "b7d5edc5d1cd4bc087e63064f1470bff.jpeg",
    1: "039005b3759d4f679f71bf7d5f3e2f26.jpeg",
    2: "4de0b76b58534743841a5dacdb45afc4.jpeg",
    3: "16f7af57f05c491c85c3e17165caa95a.jpeg",
    4: "bde9e077f894496da05099f4564d9fc3.jpeg",
  },
  products_weight: 500,
  products_live: false,
  products_visitor: 0,
  products_category: {
    categories_id: 1,
    categories_name: "Pria",
    sub_categories_id: 1,
    sub_categories_name: "Atasan",
    item_sub_categories_id: 2,
    item_sub_categories_name: "Polo",
  },
  products_brand: {},
  products_variant: {
    va1_name: "Ukuran",
    va2_name: "Warna",
    va1_items: [
      {
        va1_option: "64GB",
        va1_image: "54ba07f221aa47988c82f82ecae06742.jpeg",
        va2_items: [
          {
            va2_id: 5,
            va2_option: "Hitam",
            va2_price: 7075000,
            va2_stock: 2,
            va2_discount: 10,
            va2_discount_active: true,
          },
          {
            va2_id: 6,
            va2_option: "Red",
            va2_price: 7075000,
            va2_stock: 2,
            va2_discount: 10,
            va2_discount_active: true,
          },
        ],
      },
      {
        va1_option: "256GB",
        va1_image: "403acd45a9c840f9aacaee0aa77b0290.jpeg",
        va2_items: [
          {
            va2_id: 7,
            va2_option: "Hitam",
            va2_price: 8175000,
            va2_stock: 2,
            va2_discount: 30,
            va2_discount_active: true,
          },
          {
            va2_id: 8,
            va2_option: "Red",
            va2_price: 8175000,
            va2_stock: 2,
            va2_discount: 20,
            va2_discount_active: true,
          },
        ],
      },
      {
        va1_option: "512GB",
        va1_image: "18b202eaace64bbfa3076d2b6193278c.jpeg",
        va2_items: [
          {
            va2_id: 9,
            va2_option: "Hitam",
            va2_price: 8175000,
            va2_stock: 2,
            va2_discount: 0,
            va2_discount_active: false,
          },
          {
            va2_id: 10,
            va2_option: "Red",
            va2_price: 8175000,
            va2_stock: 2,
            va2_discount: 0,
            va2_discount_active: false,
          },
        ],
      },
    ],
  },
  products_wholesale: [],
  products_created_at: "2021-01-29T18:09:17.661440",
  products_updated_at: "2021-01-29T18:09:17.661440",
};
