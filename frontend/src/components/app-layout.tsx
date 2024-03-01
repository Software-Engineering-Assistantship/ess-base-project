export interface AppRoute {
  name: string;
  path: string;
}

export const appUserRoutes: AppRoute[] = [
  {
    name: 'Início',
    path: '/'
  },
  {
    name: 'Blusas',
    path: '/blusas'
  }
];

export const appAdminRoutes: AppRoute[] = [
  {
    name: 'Itens',
    path: '/itens'
  },
  {
    name: 'Categorias',
    path: '/categorias'
  },
  {
    name: 'Cupons',
    path: '/cupons'
  },
  {
    name: 'Entregas',
    path: '/entregas'
  }
];