export const item = {
  id: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
  partner: {},
  name: "",
  price: 0,
  status: "",
};

export const convertToCartItem = (item) => {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    image:
      "https://i.pinimg.com/736x/06/89/d6/0689d6de5fccf22e3bb6dc17e8b6e475.jpg",
    quantity: item.quantity ? item.quantity : 0,
  };
};
