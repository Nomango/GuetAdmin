const prefix = "/api";

module.exports = [
  // user login
  {
    url: `${prefix}/admin/login`,
    type: "post",
    response: (req, res) => {
      res.cookie('admin_token', '1112223334445566677788999');

      return {
        code: 0,
        message: "操作成功",
        data: null
      };
    }
  },

  // get user info
  {
    url: `${prefix}/user/info`,
    type: "get",
    response: config => {
      return {
        code: 20000,
        data: {}
      };
    }
  },

  // user logout
  {
    url: `${prefix}/user/logout`,
    type: "post",
    response: _ => {
      return {
        code: 0,
        message: "success",
        data: null
      };
    }
  }
];
