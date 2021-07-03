import request from "@/utils/request";

export function getWorkList(params) {
  return request({
    url: "/api/work",
    method: "get",
    params
  });
}

export function getWorkListById(params) {
  return request({
    url: `/api/work/${params.id}`,
    method: "get"
  });
}

export function addWorkList(data) {
  return request({
    url: "/api/admin/work/add",
    method: "post",
    data
  });
}

export function updateWorkList(data) {
  return request({
    url: "/api/admin/work/edit",
    method: "post",
    data
  });
}

export function delWorkList(data) {
  return request({
    url: "/api/admin/work/edit",
    method: "post",
    data
  });
}
