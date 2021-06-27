import request from "@/utils/request";

export function getWorkList(params) {
  return request({
    url: "/api/admin/work",
    method: "get",
    params
  });
}

export function addWorkList(body) {
  return request({
    url: "/api/admin/work/add",
    method: "post",
    body
  });
}

export function updateWorkList(body) {
  return request({
    url: "/api/admin/work/edit",
    method: "put",
    body
  });
}

export function delWorkList(body) {
  return request({
    url: "/api/admin/work/edit",
    method: "delete",
    body
  });
}
