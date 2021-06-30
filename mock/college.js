const prefix = "/api";

module.exports = [
  {
    url: `${prefix}/admin/school`,
    type: "get",
    response: (req, res) => {
      return {
        code: 0,
        message: "操作成功",
        data: ["艺术学院"]
      };
    }
  },
  {
    url: `${prefix}/admin/school/add`,
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
    url: `${prefix}/admin/teacher`,
    type: "get",
    response: (req, res) => {
      return {
        code: 0,
        message: "操作成功",
        data: {
          total_count: 100,
          teachers: [
            {
              id: 1,
              number: "1023547616",
              name: "李明",
              school: "艺术学院"
            }
          ]
        }
      };
    }
  },
  {
    url: `${prefix}/admin/teacher/:id`,
    type: "get",
    response: (req, res) => {
      return {
        code: 0,
        message: "操作成功",
        data: {
          id: 1,
          number: "1023547616",
          name: "李明",
          school: "艺术学院"
        }
      };
    }
  },
  {
    url: `${prefix}/admin/teacher/add`,
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
  },
  {
    url: `${prefix}/admin/teacher/edit`,
    type: "post",
    response: (req, res) => {
      return {
        code: 0,
        message: "操作成功",
        data: null
      };
    }
  }
];
