import { createRouter, createWebHistory } from 'vue-router'
// import AuthPage from '../pages/AuthPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import ServerSelect from '../components/ServerSelect.vue'
import ResourceList from '../pages/ResourceList.vue'
import ResourceDetail from '../pages/ResourceDetail.vue'
import AuctionList from '../pages/AuctionList.vue'
import AuctionDetail from '../pages/AuctionDetail.vue'
import UserProfile from '../pages/UserProfile.vue'
import CreateAuction from '../pages/CreateAuction.vue'

const routes = [
  { path: '/', component: ServerSelect },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  {
    path: '/dashboard',
    component: () => import('../layouts/DashboardLayout.vue'),
    children: [
      { path: 'resources', component: ResourceList },
      { path: 'resources/:id', component: ResourceDetail },
      { path: 'auctions', component: AuctionList },
      { path: 'auctions/new', component: CreateAuction },
      { path: 'auctions/:id', component: AuctionDetail },
      { path: 'profile', component: UserProfile },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router