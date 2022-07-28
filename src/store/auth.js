import axios from "../plugins/axios";
import router from '@/router';

export default {
  namespace: true,

  state: {
    token: null,
    user: null,
    voiceMemos: null,
  },

  getters: {
    authenticated(state) {
      return state.token && state.user;
    },
    user(state) {
      return state.user;
    },
    voiceMemos(state) {
      return state.voiceMemos;
    },
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setVoiceMemos(state, voiceMemos) {
      state.voiceMemos = voiceMemos;
    },
  },

  actions: {
    async login({ dispatch, commit }, credentials) {
      try {
        const response = await axios.post("auth", credentials);
        commit("setToken", response.data.token);
        localStorage.setItem("token", response.data.token);
        commit("setUser", delete response.data["token"]);
        router.push({path:'/dashboard'})
      } catch (error) {
        console.log(error.message);
      }
    },

    async voiceMemos({ dispatch, commit }) {
      const response = await axios.get("voice-memos");
      commit("setVoiceMemos", response.data);
      commit("setUser", response.data[0].user);
    },

    async download({ dispatch, commit }, data) {
      const response = await axios.get(`voice-memos/${data.id}/download`, {
        responseType: "blob",
      });

      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      let fileLink = document.createElement("a");

      fileLink.href = fileURL;
      fileLink.setAttribute(
        "download",
        `${data.title}.${response.data.type.substr(
          response.data.type.indexOf("/") + 1
        )}`
      );
      document.body.appendChild(fileLink);

      fileLink.click();
    },

    async play({ dispatch, commit }, id) {
      const response = await axios.get(`voice-memos/${id}/download`, {
        responseType: "blob",
      });

      return window.URL.createObjectURL(new Blob([response.data]));
    },
  },
};
