import axios from "axios";
const setToken = () => {
  axios
    .get(process.env.REACT_APP_API_URL + "sanctum/csrf-cookie")
    .then((data) => {});
};

export { setToken };
