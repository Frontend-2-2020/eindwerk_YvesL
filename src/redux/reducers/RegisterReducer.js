const initialState = {
  register: undefined,
};

const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      console.log("registered");
      return { register: action.payload };

    default:
      return state;
  }
};

export default RegisterReducer;
