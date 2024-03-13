import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/SetAuthToken";

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from "../types";
import { config } from "react-transition-group";

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: false,
        loading: true,
        error: null,
        user: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    //Load User

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get("api/auth");

            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
            });
        }
    };

    //Register User

    const register = async (formData) => {
        try {
            const res = await axios.post("/api/users", formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg,
            });
        }
    };

    //Login User

    const loginUser = async (formData) => {
        try {
            const res = await axios.post("/api/auth", formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg,
            });
        }
    };
    //Logout User

    const logoutUser = () => {
        dispatch({
            type: LOGOUT,
        });
    };
    //Clear Errors

    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS,
        });
    };
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                user: state.user,
                register,
                loadUser,
                loginUser,
                logoutUser,
                clearErrors,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
