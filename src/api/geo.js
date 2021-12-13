import api from "./api";

const apiPath = (path) => `geo${path ? "/" + path : ""}`;

const getProvince = async (name = "") => {
  return api.get(apiPath("province"), { params: { name } }).then(({ data }) => {
    return data;
  });
};
const getCity = async (provinceName = "") => {
  return api
    .get(apiPath("city"), { params: { province: provinceName } })
    .then(({ data }) => {
      return data;
    });
};
const getDistrict = async (provinceName = "", cityName = "") => {
  return api
    .get(apiPath("district"), {
      params: { provinceName: provinceName, city: cityName },
    })
    .then(({ data }) => {
      return data;
    });
};
const getSubDistrict = async (
  provinceName = "",
  cityName = "",
  districtName = ""
) => {
  return api
    .get(apiPath("subdistrict"), {
      params: {
        provinceName: provinceName,
        city: cityName,
        district: districtName,
      },
    })
    .then(({ data }) => {
      return data;
    });
};

export { getProvince };
