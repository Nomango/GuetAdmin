const prefix = "/api";

module.exports = [
  {
    url: `${prefix}/admin/dashboard`,
    type: "get",
    response: (req, res) => {
      return {
        "code": 0,
        "message": "",
        "data": {
          "pv": 100,
          "uv": 10,
          "total_pv": 1000,
          "total_uv": 100,
          "workCount": {
            "total": 100,
            "school": {
              "计算机学院": 100,
              "艺术学院": 100
            }
          }
        }
      }
    }
  }
]
