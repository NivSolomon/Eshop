const searchPageReducer = (state, action) => {
  switch (action.type) {
    case "GET_REQUEST": {
      return { ...state, loading: true };
    }
    case "GET_FAIL": {
      return { ...state, loading: false, error: action.payload };
    }
    case "GET_SUCCESS": {
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        page: action.payload.page
      };
    }
    default:
      return { ...state };
  }
};
export default searchPageReducer;
