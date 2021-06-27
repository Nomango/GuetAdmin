import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/Login"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home'),
        name: 'Home',
        meta: { title: '概览', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: "/college-management",
    component: Layout,
    redirect: "/college-management/college-list",
    name: "collegeManagement",
    meta: { title: "学院管理", icon: "table" },
    children: [
      {
        path: "college-list",
        name: "CollegeList",
        component: () => import("@/views/CollegeManagement/CollegeList"),
        meta: { title: "学院列表" }
      },
      {
        path: "mentor-list",
        name: "MentorList",
        component: () => import("@/views/CollegeManagement/MentorList"),
        meta: { title: "导师列表" }
      }
    ]
  },

  {
    path: "/form",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Form",
        component: () => import("@/views/form/index"),
        meta: { title: "Form", icon: "form" }
      }
    ]
  },

  {
    path: "/graduation-management",
    component: Layout,
    redirect: "/graduation-management/project-list",
    name: "GraduationManagement",
    meta: {
      title: "毕设管理",
      icon: "nested"
    },
    children: [
      {
        path: "project-list",
        component: () => import("@/views/GraduationProject/ProjectList"),
        name: "ProjectList",
        meta: { title: "毕设列表" }
      },
      {
        path: "rating-management",
        component: () => import("@/views/GraduationProject/RatingManagement"),
        name: "RatingManagement",
        meta: { title: "评级管理" }
      }
    ]
  },

  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
