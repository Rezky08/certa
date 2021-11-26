import api from "./api";

const login = async (params) => {
  return api.post("auth/login", params).then(({ data }) => {
    const { token } = data.data;
    localStorage.setItem("authorization", token);
    // api.defaults.headers.common[
    //   "Authorization"
    // ] = `Bearer ${localStorage.getItem("authorization")}`;
    attachAuthorization();
    console.log(api.defaults.headers.common);
    return token;
  });
};

const attachAuthorization = () => {
  // Set the AUTH token for any request
  api.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "authorization"
    )}`;
    config.headers.withCredentials = true;
    return config;
  });
};

const register = async (params) => {
  return api.post("auth/register", params).then(({ data }) => {
    return data;
  });
};

const logout = () => {
  localStorage.removeItem("authorization");
};

export { register, login, logout };
