import api from "./api";

const apiPath = (path) => `geo${path ? "/" + path : ""}`;

const getProvince = async (name = "") => {
  return api.get(apiPath("province"), { params: { name } }).then(({ data }) => {
    return data;
  });
};
const getCity = async (params) => {
  return api.get(apiPath("city"), { params: params }).then(({ data }) => {
    return data;
  });
};
const getDistrict = async (params) => {
  return api
    .get(apiPath("district"), {
      params: params,
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

export { getProvince, getCity, getDistrict, getSubDistrict };
