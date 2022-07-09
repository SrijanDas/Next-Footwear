import * as actiontypes from "../types/authTypes";
import axios from "../../helpers/axios";

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
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("nf_auth_token");
  dispatch({
    type: actiontypes.USER_LOGOUT,
  });
};
