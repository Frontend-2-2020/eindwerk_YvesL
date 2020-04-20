import { API } from "../../config/API";

export const loginAction = (loginValues) => (dispatch) => {
  API.post("oauth/token", loginValues).then((response) => {
    window.localStorage.setItem("LOGIN_OAUTHTOKEN", response.data.access_token);

    API.defaults.headers.common["Authorization"] =
      "Bearer " + response.data.access_token;

    dispatch(setUserData());
  });
};

export const logoutAction = () => (dispatch) => {
  window.localStorage.setItem("LOGIN_OAUTHTOKEN", undefined);

  API.defaults.headers.common["Authorization"] = undefined;
  dispatch(deleteUserData());
};

export const registerAction = (registerValues, history) => {
  API.post("api/users", registerValues).then((response) => {
    //Redirect naar login page
    history.push("/login");
  });
};

export const deleteUserData = () => {
  return {
    type: "DELETE_USER_DATA",
  };
};

export const setUserData = () => {
  return function (dispatch) {
    API.get("api/user")
      .then((response) => {
        dispatch({
          type: "SET_USER_DATA",
          payload: response.data,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
};
