import request from "@/utils/request";

export function getSTSToken(params) {
  return request({
    url: "https://sts.aliyuncs.com",
    method: "get",
    params
  });
}
