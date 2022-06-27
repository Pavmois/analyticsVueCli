import AxiosOrigin from "axios";

const axios = AxiosOrigin.create({
  baseURL: "https://track-api.leadhit.io/client/test_auth",
});

export default axios;