import api from "./api";

const login = async (params) => {
  return api.post("auth/login", params).then(({ data }) => {
    const { token } = data;
    localStorage.setItem("token", token);
    return token;
  });
};

const register = async (params) => {
  return api.post("auth/register", params).then(({ data }) => {
    return data;
  });
};

const logout = () => {
  localStorage.removeItem("token");
};

export { register, login, logout };
