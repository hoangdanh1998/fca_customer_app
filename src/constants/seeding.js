export const QR_CODE_BASE64 =
  "data:image/png;base64,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";
export const ORDER = {
  id: 1,
  orderStatus: "PREPARATION",
  storeName: "ABC Cafe",
  orderAmount: "55000",
  orderItems: "2",
  createdAt: "10/02/2021",
};

export const STORE = {
  id: 1,
  name: "Coffee Go CAGO",
  rate: 4.5,
  address: "123 Nguyễn Oanh, phường 7, quận Gò Vấp, TPHCM",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/a/a3/R%C3%B6e_g%C3%A5rd_caf%C3%A9_2.jpg",
};

export const DRINK = {
  id: 1,
  name: "Cà phê sữa",
  price: "35000",
  image:
    "https://i.pinimg.com/736x/06/89/d6/0689d6de5fccf22e3bb6dc17e8b6e475.jpg",
};

export const ORDER_DETAILS = {
  store: STORE,
  items: [
    {
      id: 1,
      name: "Cà phê sữa",
      price: "35000",
      quantity: 1,
    },
    {
      id: 2,
      name: "Cà phê",
      price: "30000",
      quantity: 1,
    },
  ],
  total: "65000",
};

export const HISTORY_ORDER = [
  {
    id: 1,
    orderStatus: "PREPARATION",
    storeName: "ABC Cafe",
    orderAmount: "55000",
    orderItems: "2",
    createdAt: "10/02/2021",
  },
  {
    id: 2,
    orderStatus: "CLOSURE",
    storeName: "ABC Cafe",
    orderAmount: "55000",
    orderItems: "2",
    createdAt: "10/02/2021",
  },
  {
    id: 3,
    orderStatus: "REJECTION",
    storeName: "ABC Cafe",
    orderAmount: "55000",
    orderItems: "2",
    createdAt: "10/02/2021",
  },
  {
    id: 4,
    orderStatus: "CANCELLATION",
    storeName: "ABC Cafe",
    orderAmount: "55000",
    orderItems: "2",
    createdAt: "10/02/2021",
  },
  {
    id: 5,
    orderStatus: "PREPARATION",
    storeName: "ABC Cafe",
    orderAmount: "55000",
    orderItems: "2",
    createdAt: "10/02/2021",
  },
  {
    id: 6,
    orderStatus: "PREPARATION",
    storeName: "ABC Cafe",
    orderAmount: "55000",
    orderItems: "2",
    createdAt: "10/02/2021",
  },
  {
    id: 7,
    orderStatus: "PREPARATION",
    storeName: "ABC Cafe",
    orderAmount: "55000",
    orderItems: "2",
    createdAt: "10/02/2021",
  },
];

export const MENU_DRINK = [
  {
    id: 1,
    name: "Cà phê sữa",
    price: "35000",
    image:
      "https://i.pinimg.com/736x/06/89/d6/0689d6de5fccf22e3bb6dc17e8b6e475.jpg",
  },
  {
    id: 2,
    name: "Cà phê",
    price: "30000",
    image:
      "https://i.pinimg.com/736x/06/89/d6/0689d6de5fccf22e3bb6dc17e8b6e475.jpg",
  },
  {
    id: 3,
    name: "Cacao",
    price: "38000",
    image:
      "https://i.pinimg.com/736x/06/89/d6/0689d6de5fccf22e3bb6dc17e8b6e475.jpg",
  },
  {
    id: 4,
    name: "Cà phê sữa",
    price: "35000",
    image:
      "https://i.pinimg.com/736x/06/89/d6/0689d6de5fccf22e3bb6dc17e8b6e475.jpg",
  },
  {
    id: 5,
    name: "Cà phê",
    price: "30000",
    image:
      "https://i.pinimg.com/736x/06/89/d6/0689d6de5fccf22e3bb6dc17e8b6e475.jpg",
  },
  {
    id: 6,
    name: "Cacao",
    price: "38000",
    image:
      "https://i.pinimg.com/736x/06/89/d6/0689d6de5fccf22e3bb6dc17e8b6e475.jpg",
  },
];

export const CART_MENU_DRINK = [
  {
    id: 1,
    name: "Cà phê sữa",
    price: "35000",
    quantity: 0,
    image:
      "https://i.pinimg.com/736x/06/89/d6/0689d6de5fccf22e3bb6dc17e8b6e475.jpg",
  },
  {
    id: 2,
    name: "Cà phê",
    price: "30000",
    quantity: 0,
    image:
      "https://i.pinimg.com/736x/06/89/d6/0689d6de5fccf22e3bb6dc17e8b6e475.jpg",
  },
  {
    id: 3,
    name: "Cacao",
    price: "38000",
    quantity: 0,
    image:
      "https://i.pinimg.com/736x/06/89/d6/0689d6de5fccf22e3bb6dc17e8b6e475.jpg",
  },
  {
    id: 4,
    name: "Cà phê sữa",
    price: "35000",
    quantity: 0,
    image:
      "https://i.pinimg.com/736x/06/89/d6/0689d6de5fccf22e3bb6dc17e8b6e475.jpg",
  },
  {
    id: 5,
    name: "Cà phê",
    price: "30000",
    quantity: 0,
    image:
      "https://i.pinimg.com/736x/06/89/d6/0689d6de5fccf22e3bb6dc17e8b6e475.jpg",
  },
  {
    id: 6,
    name: "Cacao",
    price: "38000",
    quantity: 0,
    image:
      "https://i.pinimg.com/736x/06/89/d6/0689d6de5fccf22e3bb6dc17e8b6e475.jpg",
  },
];
