import { Rate, Avatar } from 'antd'
import ProductList from 'components/Card/Admin/ProductList'

// ############################## //
// ############################## //
//      REVIEW PAGES PRODUCT      //
// ############################## //
// ############################## //

export const columnsReview = [
  {
    key: 'customer',
    title: 'Pembeli',
    dataIndex: 'customer',
    ellipsis: true,
    width: 150,
    render: customer => (
      <> 
        <Avatar src={customer.avatar} /> <span>{customer.name}</span>
      </>
    )
  },
  {
    key: 'product',
    title: 'Produk',
    dataIndex: 'product',
    width: 250,
    render: item => <ProductList item={item} />
  },
  {
    key: 'rating',
    title: 'Penilaian',
    dataIndex: 'rating',
    width: 120,
    render: rating => <Rate className="fs-14" allowHalf defaultValue={+rating} disabled />
  },
  {
    key: 'comment',
    title: 'Komentar',
    dataIndex: 'comment',
    width: 250,
    render: text => <span className="truncate-4 ws-preline">{text}</span>
  },
  {
    key: 'reply',
    title: 'Balasanmu',
    dataIndex: 'reply',
    width: 250,
    render: text => {
      return text ? <span className="truncate-4 ws-preline">{text}</span> : <a className="text-tridatu">Balas</a>

    }
  },
];

export const dataSourceReview = [
  {
    key: '1',
    customer: {
      avatar: 'https://www.bootstrapdash.com/demo/purple/react/template/demo_1/preview/static/media/face1.42d41e61.jpg',
      name: 'Jhon Deliver'
    },
    product: {
      name: 'Jaket GAP Grey',
      image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp',
      color: 'Hitam',
      size: 'M',
    },
    rating: 3.5,
    comment: '- 25 years or up.\n- This land is very close with ubud central and this land surrounding by tourist accomodation , gift shop , yoga shala , and western restaurant.\n- The positive side ofthis land is :this land have very good value as very close with ubud central which is only 7 min ride on motorbike or car , and this land is has a river view and can be turn into tourist attraction which is similar like a riverclub.\n - 25 years or up.\n- This land is very close with ubud central and this land surrounding by tourist accomodation , gift shop , yoga shala , and western restaurant.\n- The positive side ofthis land is :this land have very good value as very close with ubud central which is only 7 min ride on motorbike or car , and this land is has a river view and can be turn into tourist attraction which is similar like a riverclub.\n',
    reply: 'Terimakasih, silahkan di order kembali kak :)',
  },
  {
    key: '2',
    customer: {
      avatar: 'https://www.akveo.com/blur-admin/assets/img/app/profile/Nasta.png',
      name: 'Mia Kastania'
    },
    product: {
      name: 'Flannel Uniqlo',
      image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp',
      color: 'Hitam',
      size: 'M',
    },
    rating: 4.5,
    comment: 'Rem quia voluptatum. Aut illo facere vitae quibusdam iusto. Maxime alias fugit sequi occaecati dolor.',
    reply: null,
  },
  {
    key: '3',
    customer: {
      avatar: 'https://www.bootstrapdash.com/demo/purple/react/template/demo_1/preview/static/media/face1.42d41e61.jpg',
      name: 'Jhon Deliver'
    },
    product: {
      name: 'Jaket GAP Grey',
      image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp',
      color: 'Hitam',
      size: 'M',
    },
    rating: 3.5,
    comment: '- 25 years or up.\n- This land is very close with ubud central and this land surrounding by tourist accomodation , gift shop , yoga shala , and western restaurant.\n- The positive side ofthis land is :this land have very good value as very close with ubud central which is only 7 min ride on motorbike or car , and this land is has a river view and can be turn into tourist attraction which is similar like a riverclub.\n - 25 years or up.\n- This land is very close with ubud central and this land surrounding by tourist accomodation , gift shop , yoga shala , and western restaurant.\n- The positive side ofthis land is :this land have very good value as very close with ubud central which is only 7 min ride on motorbike or car , and this land is has a river view and can be turn into tourist attraction which is similar like a riverclub.\n',
    reply: 'Terimakasih, silahkan di order kembali kak :)',
  },
  {
    key: '4',
    customer: {
      avatar: 'https://www.akveo.com/blur-admin/assets/img/app/profile/Nasta.png',
      name: 'Mia Kastania'
    },
    product: {
      name: 'Flannel Uniqlo',
      image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp',
      color: 'Hitam',
      size: 'M',
    },
    rating: 4.5,
    comment: 'Rem quia voluptatum. Aut illo facere vitae quibusdam iusto. Maxime alias fugit sequi occaecati dolor.',
    reply: null,
  },
];

export const dataSourceReviewNorespond = [
  {
    key: '2',
    customer: {
      avatar: 'https://www.akveo.com/blur-admin/assets/img/app/profile/Nasta.png',
      name: 'Mia Kastania'
    },
    product: {
      name: 'Flannel Uniqlo',
      image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp',
      color: 'Hitam',
      size: 'M',
    },
    rating: 4.5,
    comment: 'Rem quia voluptatum. Aut illo facere vitae quibusdam iusto. Maxime alias fugit sequi occaecati dolor.',
    reply: null,
  },
];

export const dataSourceReviewResponded = [
  {
    key: '1',
    customer: {
      avatar: 'https://www.bootstrapdash.com/demo/purple/react/template/demo_1/preview/static/media/face1.42d41e61.jpg',
      name: 'Jhon Deliver'
    },
    product: {
      name: 'Jaket GAP Grey',
      image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp',
      color: 'Hitam',
      size: 'M',
    },
    rating: 3.5,
    comment: '- 25 years or up.\n- This land is very close with ubud central and this land surrounding by tourist accomodation , gift shop , yoga shala , and western restaurant.\n- The positive side ofthis land is :this land have very good value as very close with ubud central which is only 7 min ride on motorbike or car , and this land is has a river view and can be turn into tourist attraction which is similar like a riverclub.\n - 25 years or up.\n- This land is very close with ubud central and this land surrounding by tourist accomodation , gift shop , yoga shala , and western restaurant.\n- The positive side ofthis land is :this land have very good value as very close with ubud central which is only 7 min ride on motorbike or car , and this land is has a river view and can be turn into tourist attraction which is similar like a riverclub.\n',
    reply: 'Terimakasih, silahkan di order kembali kak :)',
  },
];

// ############################## //
// ############################## //
// REVIEW PAGES PRODUCT DASHBOARD //
// ############################## //
// ############################## //

export const columnsReviewDashboard = [
  {
    key: 'customer',
    title: 'Pembeli',
    dataIndex: 'customer',
    ellipsis: true,
    width: 150,
    render: customer => (
      <> 
        <Avatar src={customer.avatar} /> <span>{customer.name}</span>
      </>
    )
  },
  {
    key: 'product',
    title: 'Produk',
    dataIndex: 'product',
    width: 150,
    render: item => (
      <>
        <p className="align-top truncate-2 mb-n1">{item.name}</p>
        <p className="mb-n1 fs-11 truncate-2 text-secondary">Variasi: {item.color}, {item.size}</p>
      </>
    )
  },
  {
    key: 'rating',
    title: 'Penilaian',
    dataIndex: 'rating',
    width: 120,
    render: rating => <Rate className="fs-14" allowHalf defaultValue={rating} disabled />
  },
  {
    key: 'comment',
    title: 'Komentar',
    dataIndex: 'comment',
    width: 250,
    render: text => <span className="truncate-3 ws-preline">{text}</span>
  },
];
