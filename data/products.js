export const productsData = [
  "Jaket GAP Grey",
  "Flannel Uniqlo Biru",
  "Kemeja Converse Panjang",
];

export const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 },
    xl: { span: 24 },
  },
};

export const initialColumn = [
  {
    title: "Harga",
    dataIndex: "price",
    key: "price",
    inputType: "price",
    editable: true,
    align: "center",
    width: 150,
  },
  {
    title: "Stok",
    dataIndex: "stock",
    key: "stock",
    inputType: "stock",
    editable: true,
    align: "center",
    width: 150,
  },
  {
    title: "Kode Variasi",
    dataIndex: "code",
    key: "code",
    inputType: "code",
    editable: true,
    align: "center",
    width: 150,
  },
];
