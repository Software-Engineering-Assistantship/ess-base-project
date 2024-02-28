interface AppRoute {
  name: string;
  path: string;
}

export const appRoutes: AppRoute[] = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'About',
    path: '/about'
  }
];