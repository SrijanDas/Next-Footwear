import * as actiontypes from "../types/authTypes";
import axios from "../../utils/axios";

export const load_user = () => async (dispatch) => {
  const token = localStorage.getItem("nf_auth_token");
  if (token) {
    try {
      const res = await axios.get("/auth/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${JSON.parse(
            localStorage.getItem("nf_auth_token")
          )}`,
        },
      });
      dispatch({
        type: actiontypes.USER_LOADED_SUCCESS,
        payload: res.data,
      });
      return true;
    } catch (error) {
      console.log(error);
      dispatch({
        type: actiontypes.USER_LOADED_FAIL,
        payload: error,
      });
    }
  } else {
    dispatch({
      type: actiontypes.USER_LOADED_FAIL,
    });
  }
  return false;
};

export const loginCall = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post("/auth/token/login/", {
      email,
      password,
    });
    localStorage.setItem("nf_auth_token", JSON.stringify(res.data.auth_token));
    dispatch({
      type: actiontypes.LOGIN_SUCCESS,
      payload: res.data,
    });
    load_user();
  } catch (e) {
    const errorData = e.response.data;

    dispatch({
      type: actiontypes.LOGIN_FAIL,
      payload: errorData.non_field_errors[0],
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("nf_auth_token");
  dispatch({
    type: actiontypes.USER_LOGOUT,
  });
};
