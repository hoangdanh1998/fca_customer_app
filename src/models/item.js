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
    image: item.imageLink,
    quantity: item.quantity ? item.quantity : 0,
  };
};
