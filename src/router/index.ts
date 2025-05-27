import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '../pages/AuthPage.vue'
import ServerSelect from '../components/ServerSelect.vue'
import ResourceList from '../pages/ResourceList.vue'
import ResourceDetail from '../pages/ResourceDetail.vue'
import AuctionList from '../pages/AuctionList.vue'
import AuctionDetail from '../pages/AuctionDetail.vue'
import UserProfile from '../pages/UserProfile.vue'
import CreateAuction from '../pages/CreateAuction.vue'

const routes = [
  { path: '/', component: ServerSelect },
  { path: '/login', component: AuthPage },
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