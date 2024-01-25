import { USER_SIGNIN, USER_SIGNOUT, ADD_TO_CART } from "../actions";

const storeReducer = (state, action) => {

    switch (action.type) {
        case USER_SIGNIN:{
            return {...state, userInfo: action.payload};
        }
        case USER_SIGNOUT:{
            return {...state,
                userInfo: null,
                cart: {cartItems: [], shippinngAddress: {}, paymentMethod: ""}
            };
        }
        case ADD_TO_CART: {
            const newItem = action.payload;
            const existingItem = state.cart.cartItems.find(
              (item) => item._id === newItem._id
            );
            const cartItems = existingItem
              ? state.cart.cartItems.map((item) =>
                  item._id === existingItem._id ? newItem : item
                ) //סינטקס מוזר אבל הוא מחזיר את כל המערך, עם החלפה של את האייטם הישן בחדש
              : [...state.cart.cartItems, newItem];
      
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
      
            return { ...state, cart: { ...state.cart, cartItems } };
          }
        
        default: return {...state};
    }

}
export default storeReducer;

