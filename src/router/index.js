import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import login from "../components/pages/login.vue"
import index from "../components/pages/index.vue"
import register from "../components/pages/register.vue"
import changepsw from "../components/pages/changepsw.vue"
import findTeacher from "../components/pages/findTeacher.vue"
import deliverwater from "../components/pages/deliverwater.vue"
import waterdetail from "../components/pages/waterdetail.vue"
import watercomment from "../components/pages/watercomment.vue"
import servicelist from "../components/pages/servicelist.vue"
import servicedetail from "../components/pages/servicedetail.vue"
import servicecomment from "../components/pages/servicecomment.vue"
import household from "../components/pages/household.vue"
import householdlist from "../components/pages/householdlist.vue"
import householddetail from "../components/pages/householddetail.vue"
export default new Router({
  routes: [{
      path: "/login",
      component: login
    },
    {
      path: "/index",
      component: index
    },
    {
      path: "/register",
      component: register
    },
    {
      path: "/changepsw",
      component: changepsw
    },
    {
      path: "/findTeacher",
      component: findTeacher
    },
    {
      path: "/deliverwater",
      component: deliverwater
    },
    {
      path: "/waterdetail",
      component: waterdetail
    },
    {
      path: "*",
      redirect: "/login"
    }, 
    {
      path: "/watercomment",
      component:watercomment
    },
    {
      path:"/servicelist",
      component:servicelist
    },
    {
      path:"/servicedetail",
      component:servicedetail
    }, 
    {
      path: "/servicecomment",
      component:servicecomment
    },
    {
      path:"/household",
      component:household
    },
    {
      path:"/householdlist",
      component:householdlist
    },
    {
      path:"/householddetail",
      component:householddetail
    }
  ],
})
