import Vue from 'vue'
import Router from 'vue-router'
import findLast from 'lodash/findlast'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import NotFound from '@/views/404'
import Forbidden from '@/views/403'
import { notification } from 'ant-design-vue'
import { check, isLogin } from '../utils/auth' 


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/user',
      hideInMenu: true,
      // component: {render: h => h('router-view')} ,
      component: () => import('@/layouts/UserLayout'),
      children: [
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          path: '/user/login',
          name: 'login',
          component: () => import('@/views/User/Login'),
        },
        {
          path: '/user/register',
          name: 'register',
          component: () => import('@/views/User/Register'),
        }
      ]
    },
    {
      path: '/',
      meta: {authority: ['user', 'admin']},
      component: () => import('@/layouts/BasicLayout'),
      children: [
        // dashboard
        {
          path: '/',
          redirect: '/dashboard/analysis'
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: { icon: 'dashboard', title: '仪表盘' },
          component: {render: h => h('router-view')},
          children: [
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              meta: {title: '分析页'},
              component: () => import('@/views/DashBoard/Analysis')
            }
          ]
        },
        // form
        {
          path: '/form',
          name: 'form',
          meta: { icon: 'form', title: '表单', authority: ['admin'] },
          component: {render: h => h('router-view')},
          children: [
            {
              path: '/form/basic-form',
              name: 'basicform',
              meta: { title: '基础表单' },
              component: () => import('@/views/Forms/BasicForm')
            },
            {
              path: '/form/step-form',
              name: 'stemform',
              meta: { title: '分布表单' },
              hideChildrenInMenu: true,
              component: () => import('@/views/Forms/StepForm'),
              children: [
                {
                  path: '/form/step-form',
                  redirect: '/form/step-form/info',
                },
                {
                  path: '/form/step-form/info',
                  name: 'info',
                  component: () => import('@/views/Forms/StepForm/Step1')
                },
                {
                  path: '/form/step-form/confirm',
                  name: 'confirm',
                  component: () => import('@/views/Forms/StepForm/Step2')
                },
                {
                  path: '/form/step-form/result',
                  name: 'result',
                  component: () => import('@/views/Forms/StepForm/Step3')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/403',
      name: '403',
      hideInMenu: true,
      component: Forbidden,
    },
    {
      path: '*',
      name: '404',
      hideInMenu: true,
      component: NotFound,
    },
  ]
});

router.beforeEach((to, from, next) => {
  if(to.path !== from.path) {
    NProgress.start()
  }
  const record = findLast(to.matched, record => record.meta.authority)
  if(record && !check(record.meta.authority)) {
    if(!isLogin() && to.path !== '/user/login') {
      next({
        path: '/user/login'
      })
    } else if(to.path !== '403') {
      notification({
        message: '430',
        description:
          '你没有权限反问，请联系管理员 ',
      });
      next({
        path: '/403'
      })
    }
    NProgress.done()
  }
  next()
});

router.afterEach((to, from, next) => {
  NProgress.done()
})

export default router
