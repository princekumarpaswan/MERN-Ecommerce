import { CLEAR_ERROR } from "../constants/productConstants";
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
} from "../constants/userConstrants"

import axios from "axios";


// Login USer
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`/api/prince/login`,
            { email, password },
            config
        )

        dispatch({ type: LOGIN_SUCCESS, payload: data.user })

    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
}

// Register User 
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`/api/prince/register`, userData, config)

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`/api/prince/me`)

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })

    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message })
    }
}
// Logout User
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/prince/logout`);

        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`/api/prince/me/update`, userData, config);

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.sucess });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/prince/password/update`,
            passwords,
            config
        );

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.sucess });
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`/api/prince/password/forgot`, email, config);

        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/prince/password/reset/${token}`,
            passwords,
            config
        );

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.sucess });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};




// Clearing all arror 

export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
}