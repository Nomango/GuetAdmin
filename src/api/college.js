import request from "@/utils/request";

export function getCollegeList(params) {
  return request({
    url: "/api/admin/school",
    method: "get",
    params
  });
}

export function getMentorList(params) {
  return request({
    url: "/api/admin/teacher",
    method: "get",
    params
  });
}

export function addMentorList(body) {
  return request({
    url: "/api/admin/teacher/add",
    method: "post",
    body
  });
}

export function updateMentorList(body) {
  return request({
    url: "/api/admin/teacher/edit",
    method: "put",
    body
  });
}
