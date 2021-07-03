import request from "@/utils/request";

export function fetchPrefix() {
  return request({
    url: "/api/upload/prefix",
    method: "get"
  });
}

export function uploadFile() {
  return request({
    url: "/api/admin/upload",
    method: "post"
  });
}
