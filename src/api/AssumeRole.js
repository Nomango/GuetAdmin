import request from "@/utils/request";

export function getSTSToken(params) {
  return request({
    url: "/admin/upload/sts_token",
    method: "get",
    params
  });
}
