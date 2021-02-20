import { PARTNER_ACTIONS } from "../action-types/actions";

const initialState = {
  partner: {
    id: "8ceee651-7dea-4a0f-b517-b49166cb6cfb",
    name: "Cafe Sân Vườn Mimosa",
    address: {
      id: "8ceee651-7dea-4a0f-b517-b49166cb6cfb",
      description:
        "1234 QL1A, Thạnh Xuân, Quận 12, Thành phố Hồ Chí Minh, Việt Nam",
      latitude: "10.8624756",
      longitude: "106.6690795",
    },
    status: "APPROVED",
    phone: "0875647387",
    account: null,
    items: [],
    requestItems: [],
  },
};

const partnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PARTNER_ACTIONS.GET_PARTNER_INFORMATION: {
      const data = action.payload.data.data.partner;
      return { ...state, partner: data };
    }

    default:
      return state;
  }
};

export default partnerReducer;
