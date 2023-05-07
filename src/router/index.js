import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue';
import LoginForm from '@/views/LoginForm.vue';
import RegisterForm from '@/views/RegisterForm.vue';
import KanbanBoard from '@/components/Dasboard/KanbanBoard.vue';
import DiscussionView from '@/views/DiscussionView.vue';
import GroupView from '@/views/GroupView.vue';
import ProfilView from '@/views/ProfilView.vue';
import store from '../store'
const routes = [
  {
    path: '/dashboard',
    name: 'DashboardView',
    component: DashboardView,
    meta: {
      auth: "true"
    },
    children: [
      {
        path: '/dashboard',
        name: 'KanbanBoard',
        component: KanbanBoard
      },
      
      {
        path: '/discussion/:id',
        name: 'DiscussionView',
        component: DiscussionView

      },
      {
        path: '/group',
        name: 'GroupView',
        component: GroupView

      },
      {
        path: '/profil',
        name: 'ProfilView',
        component: ProfilView

      }
    ]
  },
  {
    path: '/',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/register',
    name: 'RegisterForm',
    component: RegisterForm
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
  linkActiveClass: 'active'
})
router.beforeEach((to, from, next) => {
  if (to.meta.auth === 'true') {
    if (store.state.data.token != null) {
      return next()
    } else {
      router.push({
        path: '/'
      })
    }
  } else {
    return next()
  }
});

export default router
