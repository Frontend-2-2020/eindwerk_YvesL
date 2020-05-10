import { API } from "../../config/API";

export const registerAction = (registerValues, history) => {
  API.post("api/users", registerValues).then((response) => {
    //Redirect naar login page
    history.push("/login");
  });
};
