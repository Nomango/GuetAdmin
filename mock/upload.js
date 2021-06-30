const prefix = "/api";

module.exports = [
  {
    url: `${prefix}/admin/upload`,
    type: "post",
    response: (req, res) => {
      return {
        code: 0,
        message: "操作成功",
        data: {
          url: "blob:http://localhost:9528/57daec07-d81d-4ec9-9d94-9736632755a4"
        }
      };
    }
  }
];
