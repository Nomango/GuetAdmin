const prefix = "/api";

module.exports = [
  {
    url: `${prefix}/admin/work/1`,
    type: "get",
    response: (req, res) => {
      return {
        code: 0,
        message: "操作成功",
        data: {
          id: 1,
          name: "《木偶戏》",
          school: "艺术学院",
          level: 1,
          student: {
            number: "1023547616",
            name: "李明"
          },
          brief: "简介",
          teachers: [1, 2],
          cover: "image_url",
          content: "<p>sdfasd</p>"
        }
      };
    }
  },

  {
    url: `${prefix}/admin/work`,
    type: "get",
    response: (req, res) => {
      return {
        code: 0,
        message: "操作成功",
        data: {
          total_count: 5,
          works: [
            {
              id: 1,
              name: "《木偶戏》",
              school: "艺术学院",
              level: 1,
              student: {
                number: "1023547616",
                name: "李明"
              }
            }
          ]
        }
      };
    }
  },

  {
    url: `${prefix}/admin/work/delete`,
    type: "post",
    response: (req, res) => {
      return {
        code: 0,
        message: "操作成功",
        data: null
      };
    }
  },
  {
    url: `${prefix}/admin/work/edit`,
    type: "post",
    response: (req, res) => {
      return {
        code: 0,
        message: "操作成功",
        data: null
      };
    }
  },
  {
    url: `${prefix}/admin/work/add`,
    type: "post",
    response: (req, res) => {
      return {
        code: 0,
        message: "操作成功",
        data: {
          id: 1
        }
      };
    }
  }
];
