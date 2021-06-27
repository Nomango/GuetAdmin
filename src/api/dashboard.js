import request from "@/utils/request";

export function getDashBoard(params) {
  return request({
    url: "/api/admin/dashboard",
    method: "get",
    params
  });
}
