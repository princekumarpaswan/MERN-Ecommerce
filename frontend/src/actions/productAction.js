import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERROR
} from "../constants/productConstants";


export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
    async (dispatch) => {
        try {
            dispatch({ type: ALL_PRODUCT_REQUEST });

            let link = `/api/prince/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

            if (category) {
                link = `/api/prince/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
            }

            const { data } = await axios.get(link);
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


export const getProductDetails = (id) =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_DETAILS_REQUEST });
            const { data } = await axios.get(`/api/prince/products/${id}`);
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data.product
            })
        } catch (error) {
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: error.response.data.message,
            })
        }
    }


// Clearing errors
export const clearError = () =>
    async (dispatch) => {
        dispatch({ type: CLEAR_ERROR })
    }
