import { API } from "../../config/API";

export const loginAuth = () => async (dispatch) => {
  console.log("isLoggedIn");
  await API.get("api/user").then((response) => {
    console.log(response.data);
    dispatch({ type: "LOGIN", payload: response.data, login: true });
  });
};

export const logoutAuth = () => (dispatch) => {
  console.log("Isloggedout");
  window.localStorage.removeItem("yves_acces_token");
  API.defaults.headers.common["Authorization"] = undefined;
  dispatch({ type: "LOGOUT" });
};
