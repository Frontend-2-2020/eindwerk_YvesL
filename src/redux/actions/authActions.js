import { API } from "../../config/API";

export const loginAuth = () => async (dispatch) => {
  console.log("isLoggedIn");
  await API.get("api/user")
    .then((response) => {
      dispatch({ type: "LOGIN", payload: response.data });
    })
    .catch((err) => {
      console.log("login to get user auth: " + err);
    });
};

export const logoutAuth = () => (dispatch) => {
  window.localStorage.removeItem("yves_acces_token");
  API.defaults.headers.common["Authorization"] = undefined;
  dispatch({ type: "LOGOUT" });
};
