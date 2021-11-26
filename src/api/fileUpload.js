import api from "./api";

const uploadTest = async (formData = new FormData()) => {
  return api.post("attachment", formData).then(({ data }) => {
    return data;
  });
};

const upload = async (files) => {
  const formData = new FormData();

  Array.from(files).forEach((file) => formData.append("file[]", file));

  return api.post("attachment", formData).then(({ data }) => {
    return data;
  });
};

export { upload, uploadTest };
