type Route = { [key: string]: { NG_PATH: string; PATH: string } };

export const DomainRoutes: Route = {
  HOME: {
    NG_PATH: 'home',
    PATH: '/home',
  },

  DEALS: {
    NG_PATH: 'deals/:page',
    PATH: '/deals',
  },

  WISHLIST: {
    NG_PATH: 'wishlist/:id',
    PATH: '/wishlist',
  },

  BEST_GAMES: {
    NG_PATH: 'best-games',
    PATH: '/best-games',
  },

  GAME: {
    NG_PATH: 'game/:id',
    PATH: '/game',
  },
};
