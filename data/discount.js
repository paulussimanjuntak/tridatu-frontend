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
        discount={item.products_discount}
        price={item.variants_price}
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
        active={item.promo_active}
        start={item.promo_start}
        end={item.promo_end}
      />
    ),
  },
  {
    title: "Status",
    dataIndex: "products",
    key: "status",
    width: 200,
    ellipsis: true,
    render: (item) => <ItemStatusPromo statusPromo={item.promo_status} />,
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


export const productsList = {
  data: [
    {
      products_id: 2,
      products_name: "Astronaut Ramen Food",
      products_slug: "astronaut-ramen-food",
      products_image_product: "8bdee36b5c1a4456ac7084638a9d9c92.jpeg",
      products_live: true,
      products_love: true,
      products_wholesale: false,
      products_created_at: "2021-01-28T17:30:37.215587",
      products_updated_at: "2021-01-28T17:36:35.304195",
      variants_price: 119000,
    },
    {
      products_id: 3,
      products_name: "Kawaii Unicorn",
      products_slug: "kawaii-unicorn",
      products_image_product: "a766c7ac4e2443a582052b3396a919ec.jpeg",
      products_live: true,
      products_love: true,
      products_wholesale: false,
      products_created_at: "2021-01-28T17:33:53.817909",
      products_updated_at: "2021-01-28T17:36:33.734137",
      variants_price: 120000,
    },
    {
      products_id: 4,
      products_name: "Burger Cute",
      products_slug: "burger-cute",
      products_image_product: "60b73d0af0884acb8c7416dabd5ec5d0.jpeg",
      products_live: true,
      products_love: true,
      products_wholesale: false,
      products_created_at: "2021-01-28T17:36:20.182935",
      products_updated_at: "2021-01-28T17:36:32.337455",
      variants_price: 150000,
    },
    {
      products_id: 5,
      products_name: "Coffee Time",
      products_slug: "coffee-time",
      products_image_product: "ce3c276217c343d49c38c2baed43280f.jpeg",
      products_live: true,
      products_love: false,
      products_wholesale: true,
      products_created_at: "2021-01-28T18:53:12.506275",
      products_updated_at: "2021-01-30T15:05:09.774417",
      variants_price: 100000,
    },
    {
      products_id: 6,
      products_name: "Chicken Cute",
      products_slug: "chicken-cute",
      products_image_product: "2358dbd8f7a044bba40c6293cdd80e98.jpeg",
      products_live: true,
      products_love: false,
      products_wholesale: false,
      products_created_at: "2021-01-28T20:38:57.804000",
      products_updated_at: "2021-01-28T20:39:48.437186",
      variants_price: 100000,
    },
    {
      products_id: 7,
      products_name: "Dog Happy",
      products_slug: "dog-happy",
      products_image_product: "ddf24ec7f54c42959e1167629344eed9.jpeg",
      products_live: true,
      products_love: false,
      products_wholesale: false,
      products_created_at: "2021-01-28T20:41:41.637106",
      products_updated_at: "2021-01-28T22:36:43.046219",
      variants_price: 140000,
    },
  ],
  total: 6,
  next_num: null,
  prev_num: null,
  page: 1,
  iter_pages: [1],
};


export const product1 = {
  products_id: 5,
  products_name: "Coffee Time",
  products_slug: "coffee-time",
  products_desc: "Florida Beach Florida Beach Florida Beach Florida Beach",
  products_condition: true,
  products_image_product: {
    0: "ce3c276217c343d49c38c2baed43280f.jpeg",
    1: "50b9ba0af5df482f919b86656a099451.jpeg",
  },
  products_weight: 400,
  products_live: true,
  products_visitor: 0,
  products_category: {
    categories_id: 1,
    categories_name: "Pria",
    sub_categories_id: 1,
    sub_categories_name: "Baju",
    item_sub_categories_id: 2,
    item_sub_categories_name: "Kaos",
  },
  products_brand: {},
  products_variant: {
    va1_items: [
      {
        va1_id: 36,
        va1_price: 100000,
        va1_stock: 100,
      },
    ],
  },
  products_wholesale: [
    {
      wholesale_id: 1,
      wholesale_min_qty: 10,
      wholesale_price: 90000,
    },
    {
      wholesale_id: 2,
      wholesale_min_qty: 20,
      wholesale_price: 80000,
    },
  ],
  products_created_at: "2021-01-28T18:53:12.506275",
  products_updated_at: "2021-01-30T15:05:09.774417",
};

export const product2 = {
  products_id: 6,
  products_name: "Chicken Cute",
  products_slug: "chicken-cute",
  products_desc:
    "Chicken Cute Chicken Cute Chicken Cute Chicken Cute Chicken Cute",
  products_condition: true,
  products_image_product: {
    0: "2358dbd8f7a044bba40c6293cdd80e98.jpeg",
    1: "c6b3f6b8befb493ca85bd539fb9dcf79.jpeg",
    2: "8f0ce700077541b69500355fe1d29c36.jpeg",
  },
  products_weight: 500,
  products_live: true,
  products_visitor: 0,
  products_category: {
    categories_id: 1,
    categories_name: "Pria",
    sub_categories_id: 1,
    sub_categories_name: "Baju",
    item_sub_categories_id: 2,
    item_sub_categories_name: "Kaos",
  },
  products_brand: {},
  products_variant: {
    va1_name: "Warna",
    va1_items: [
      {
        va1_id: 25,
        va1_option: "Hijau",
        va1_price: 150000,
        va1_stock: 100,
        va1_image: "a3845986229040eb8b3c4459490b6364.jpeg",
      },
      {
        va1_id: 26,
        va1_option: "Magenta",
        va1_price: 120000,
        va1_stock: 100,
        va1_image: "5673e5242f6c4f4baba336e5a5df87f5.jpeg",
      },
      {
        va1_id: 27,
        va1_option: "Chaki",
        va1_price: 100000,
        va1_stock: 100,
        va1_image: "5ca0b076e72242fd9c4c16aee8d863f6.jpeg",
      },
    ],
  },
  products_wholesale: [],
  products_created_at: "2021-01-28T20:38:57.804000",
  products_updated_at: "2021-01-28T20:39:48.437186",
};

export const product3 = {
  products_id: 7,
  products_name: "Dog Happy",
  products_slug: "dog-happy",
  products_desc: "Dog Happy Dog Happy Dog Happy Dog Happy",
  products_condition: false,
  products_image_product: {
    0: "ddf24ec7f54c42959e1167629344eed9.jpeg",
    1: "531e2dd8f78248a2b55f99fc8b14ddf8.jpeg",
  },
  products_weight: 100,
  products_live: true,
  products_visitor: 0,
  products_category: {
    categories_id: 1,
    categories_name: "Pria",
    sub_categories_id: 1,
    sub_categories_name: "Baju",
    item_sub_categories_id: 2,
    item_sub_categories_name: "Kaos",
  },
  products_brand: {},
  products_variant: {
    va1_name: "Warna",
    va2_name: "Ukuran",
    va1_items: [
      {
        va1_option: "Merah",
        va1_image: "f6252919e98047fcbef8b0ebf6a0e8ac.jpeg",
        va2_items: [
          {
            va2_id: 32,
            va2_option: "S",
            va2_price: 100000,
            va2_stock: 8,
            va2_code: "code 1",
            va2_barcode: "barcode 1",
          },
          {
            va2_id: 33,
            va2_option: "M",
            va2_price: 120000,
            va2_stock: 9,
            va2_code: "code 2",
            va2_barcode: "barcode 2",
          },
        ],
      },
      {
        va1_option: "Kuning",
        va1_image: "bf43f6594ac84f33bdb7f7601430d22d.jpeg",
        va2_items: [
          {
            va2_id: 34,
            va2_option: "S",
            va2_price: 100000,
            va2_stock: 10,
            va2_code: "code 3",
            va2_barcode: "barcode 3",
          },
          {
            va2_id: 35,
            va2_option: "M",
            va2_price: 140000,
            va2_stock: 30,
            va2_code: "code 3",
            va2_barcode: "barcode 4",
          },
        ],
      },
    ],
  },
  products_wholesale: [],
  products_created_at: "2021-01-28T20:41:41.637106",
  products_updated_at: "2021-01-28T22:36:43.046219",
};

