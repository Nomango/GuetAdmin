import { login } from "@/api/user";
import { getToken, removeToken, setToken } from "@/utils/auth";

import MD5 from "js-md5";

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  introduction: ""
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  }
};

const actions = {
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;

    const res = await login({ name: username.trim(), secret: MD5(password) });
    const resData = res.data || {};

    if (resData.token) {
      commit('SET_TOKEN', resData.token)
      setToken(resData.token);
    }
  },

  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      removeToken();
      resolve();
    });
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
