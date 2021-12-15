import api from "./api";
import { serialize } from "object-to-formdata";

const apiPath = (path) => `sayembara${path ? "/" + path : ""}`;

const getSayembara = async (id) => {
  return api.get(apiPath(id)).then(({ data }) => {
    return data;
  });
};

const getSayembaraList = async () => {
  return api.get(apiPath()).then(({ data }) => {
    return data;
  });
};

const createNewSayembara = async (data) => {
  let formData = serialize(data);
  return api.post(apiPath(), formData).then(({ data }) => {
    return data;
  });
};

const getSayembaraCategory = async () => {
  return api.get(apiPath("category")).then(({ data }) => data);
};

const getSayembaraPresentType = async () => {
  return api.get(apiPath("present/type")).then(({ data }) => data);
};

export {
  createNewSayembara,
  getSayembaraCategory,
  getSayembaraPresentType,
  getSayembaraList,
  getSayembara,
};
