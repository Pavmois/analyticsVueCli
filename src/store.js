import { createStore } from "vuex";
import Api from "./";
import router from "./router";

const store = createStore({
  state: {
    key: "",
  },
  mutations: {
    getResponse(state, [data, siteId]) {
      if (data.message === "ok") {
        state.key = siteId;
        localStorage.setItem("leadhit-site-id", JSON.stringify(siteId));
        router.push("/analytics");
        state.notValidKey = false;
      } else {
        state.key = null;
        state.notValidKey = true;
        setTimeout(() => (state.notValidKey = false), 5000);
        localStorage.removeItem("leadhit-site-id");
      }
    },
    getSiteId(state) {
      state.key = JSON.parse(localStorage.getItem("leadhit-site-id"));
    },
  },
  actions: {
    async sendSiteId({ commit }, siteId) {
      commit("getResponse", [await Api.sendSiteId(siteId), siteId]);
    },
  },
});

export default store;
