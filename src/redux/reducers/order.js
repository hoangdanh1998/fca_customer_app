import { ORDER_ACTIONS } from "../action-types/actions";

const initialState = {
  createdOrder: {
    "createdAt": "2021-02-25T08:15:05.503Z",
    "customer": {
      "account": null,
      "createdAt": "2021-02-05T03:53:58.725Z",
      "deletedAt": null,
      "id": "76babaeb-3a80-4c35-8695-0305083e88fd",
      "name": "Hoàng Danh",
      "phone": "0394422439",
      "updatedAt": "2021-02-05T03:53:58.725Z",
    },
    "deletedAt": null,
    "id": "6721614c-a21f-4970-bc80-bfe47ee3dcd3",
    "items":[
      {
        "createdAt": "2021-02-25T08:15:05.558Z",
        "deletedAt": null,
        "id": "0dde54a6-45ce-4544-bcd0-7f311b1572b0",
        "name": "Cacao đá",
        "price": "25000",
        "quantity": 1,
        "updatedAt": "2021-02-25T08:15:05.558Z",
      },
    ],
    "partner":  {
      "account": null,
      "address": null,
      "createdAt": "2021-02-24T03:19:00.875Z",
      "deletedAt": null,
      "id": "0440ef59-6c90-4630-8be4-553533e45591",
      "imageLink": "https://retaildesignblog.net/wp-content/uploads/2016/07/GENERAL-SUPPLY-store-and-cafe-Nagoya-Japan.jpg",
      "items":  [],
      "name": "Quán cà phê 53",
      "phone": "0394422123",
      "requestItems": [],
      "status": "PROCESS",
      "updatedAt": "2021-02-24T03:19:00.875Z",
    },
    "status": "ACCEPTANCE",
    "total": 25000,
    "transaction":  [
      {
        "createdAt": "2021-02-25T08:15:23.644Z",
        "deletedAt": null,
        "fault": null,
        "fromStatus": "INITIALIZATION",
        "id": "e752e7b7-30eb-489d-96f9-64fcc82f0174",
        "toStatus": "ACCEPTANCE",
        "updatedAt": "2021-02-25T08:15:23.644Z",
      },
    ],
    "updatedAt": "2021-02-25T08:15:23.605Z",
  },
  order: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_ACTIONS.CREATE_ORDER: {
      const data = action.payload.data.data.order;
      return { ...state, createdOrder: data };
    }
    case ORDER_ACTIONS.GET_ORDER: {
      const data = action.payload.data.data.order;
      return { ...state, order: data };
    }
    default:
      return state;
  }
};

export default orderReducer;
