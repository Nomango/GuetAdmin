const prefix = "/api";

module.exports = [
  {
    url: `${prefix}/admin/work`,
    type: "get",
    response: (req, res) => {
      return {
        "code": 0,
        "message": "操作成功",
        "data": {
          "totalCount": 5,
          "works": [
            {
              "id": 1,
              "name": "《木偶戏》",
              "school": "艺术学院",
              "level": 1,
              "student": {
                "number": "1023547616",
                "name": "李明"
              }
            }
          ]
        }
      }
    }
  },
  {
    url: `${prefix}/admin/work/:id`,
    type: "get",
    response: (req, res) => {
      return {
        "code": 0,
        "message": "操作成功",
        "data": {
          "id": 1,
          "name": "《木偶戏》",
          "school": "艺术学院",
          "level": 1,
          "student": {
            "number": "1023547616",
            "name": "李明"
          },
          "teachers": [1, 2],
          "cover": "image_url",
          "content": "<rich text>"
        }
      }
    }
  },
  {
    url: `${prefix}/admin/work/delete`,
    type: "delete",
    response: (req, res) => {
      return {
        "code": 0,
        "message": "操作成功",
        "data": null
      }
    }
  },
  {
    url: `${prefix}/admin/work/edit`,
    type: "put",
    response: (req, res) => {
      return {
        "code": 0,
        "message": "操作成功",
        "data": null
      }
    }
  },
  {
    url: `${prefix}/admin/work/add`,
    type: "post",
    response: (req, res) => {
      return {
        "code": 0,
        "message": "操作成功",
        "data": {
          "id": 1
        }
      }
    }
  }
]
