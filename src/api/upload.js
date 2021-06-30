import request from "@/utils/request";

export function getToken() {
  return request({
    url: "/qiniu/upload/token",
    method: "get"
  });
}

export function uploadFile() {
  return request({
    url: "/api/admin/upload",
    method: "post"
  });
}
