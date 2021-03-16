import { ADD_ITEM, DELETE_ITEM } from "./actions";

const INITIAL_STATE = {
  wishList: [],
};

// Complete the three cases below
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        wishList: [...state.wishList, action.payload],
      };
    case DELETE_ITEM:
      return {
        ...state,
        wishList: state.wishList.filter((item) => item !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
