import axios from "axios";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, CLEAR_ERROR } from "../constants/productConstants";


export const getProduct = () =>
    async (dispatch) => {
        try {
            dispatch({ type: ALL_PRODUCT_REQUEST });
            const { data } = await axios.get("/api/prince/products");
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: error.response.data.message,
            })
        }
    }


// Clearing errors
export const clearError = () =>
    async (dispatch) => {
        dispatch({ type: CLEAR_ERROR })
    }
