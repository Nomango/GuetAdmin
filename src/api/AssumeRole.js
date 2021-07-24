import request from "@/utils/request";

export function getSTSToken(params) {
  return request({
    url: "/api/admin/upload/sts_token",
    method: "get",
    params
  });
}
