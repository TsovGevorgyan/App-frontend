import { lazy } from 'react';

import Login from '../views/apps/login';
import Register from '../views/apps/register';
import BuyerDashboard from '../views/apps/dashboard/buyerDashboard';
import SellerDashboard from '../views/apps/dashboard/sellerDashboard';

const user = localStorage.getItem('userAccount');
const role = user ? JSON.parse(user).role : '';

console.log('role', role);
const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/dashboard',
    component: role === 'buyer' ? BuyerDashboard : SellerDashboard,
  },
];

export default routes;
