import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProductDetailsReducer, ProductReducer } from "./reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";

import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
    products: ProductReducer,
    productDetails: ProductDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    newOrder: newOrderReducer,
    myOrder: myOrdersReducer,
    orderDetails: orderDetailsReducer

});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store