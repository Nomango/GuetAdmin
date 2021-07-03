import request from "@/utils/request";

export function getCollegeList(params) {
  return request({
    url: "/api/school",
    method: "get",
    params
  });
}

export function addCollegeList(data) {
  return request({
    url: "/api/admin/school/add",
    method: "post",
    data
  });
}

export function getMentorList(params) {
  return request({
    url: "/api/teacher",
    method: "get",
    params
  });
}

export function addMentorList(data) {
  return request({
    url: "/api/admin/teacher/add",
    method: "post",
    data
  });
}

export function updateMentorList(data) {
  return request({
    url: "/api/admin/teacher/edit",
    method: "post",
    data
  });
}
