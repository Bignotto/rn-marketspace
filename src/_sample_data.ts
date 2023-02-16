import { IProductDTO } from "@dtos/IProductDTO";

export const DATA: IProductDTO[] = [
  {
    id: "7a58dfe1-0ac9-4cee-accb-29dba5a51880",
    name: "Game Boy",
    description: "Game boy original, funcionando!",
    is_new: false,
    price: 300,
    accept_trade: false,
    user_id: "458e155b-7994-4e39-bd2b-b6353311f32c",
    user: {
      id: "458e155b-7994-4e39-bd2b-b6353311f32c",
      avatar: "4b04f3a8d21936b6d592-sample_avatar.png",
      name: "Rocketseat",
      email: "desafio@rocketseat.com.br",
      tel: "+5511915839648",
    },
    is_active: true,
    created_at: "2023-01-21T22:03:52.752Z",
    updated_at: "2023-01-21T22:03:52.752Z",
    product_images: [
      {
        path: "https://tm.ibxk.com.br/2016/02/23/23175905693270.jpg",
        id: "5aadef9f-465a-49c8-9a71-dca2aa339271",
      },
    ],
    payment_methods: [
      {
        key: "pix",
        name: "Pix",
      },
    ],
  },
  {
    id: "7a58dfe1-0ac9-4cee-accb-29dba5a51881",
    name: "Game Boy",
    description: "Game boy original, funcionando!",
    is_new: false,
    price: 300,
    accept_trade: false,
    user_id: "458e155b-7994-4e39-bd2b-b6353311f32c",
    user: {
      id: "458e155b-7994-4e39-bd2b-b6353311f32c",
      avatar: "4b04f3a8d21936b6d592-sample_avatar.png",
      name: "Rocketseat",
      email: "desafio@rocketseat.com.br",
      tel: "+5511915839648",
    },
    is_active: true,
    created_at: "2023-01-21T22:03:52.752Z",
    updated_at: "2023-01-21T22:03:52.752Z",
    product_images: [
      {
        path: "https://s2.glbimg.com/PLK5WTBnpcwO_6Tn1WDOcMliUL8=/0x0:695x391/984x0/smart/filters:strip_icc()/s.glbimg.com/po/tt2/f/original/2016/07/15/top10n64.jpg",
        id: "5aadef9f-465a-49c8-9a71-dca2aa339271",
      },
    ],
    payment_methods: [
      {
        key: "pix",
        name: "Pix",
      },
    ],
  },
];
