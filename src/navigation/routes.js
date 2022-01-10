const user = localStorage.getItem('userAccount');

const signedUsersLinks = [
  {
    link: '/dashboard',
    name: 'Dashboard',
  },
  {
    link: '/products',
    name: 'Products',
  },
];
const unsignedLinks = [
  {
    link: '/login',
    name: 'Login',
  },
  {
    link: '/register',
    name: 'Register',
  },
];
export default user ? signedUsersLinks : unsignedLinks;
