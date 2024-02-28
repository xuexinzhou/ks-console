import routes from './routes';
import locales from './locales';

const menu = {
  parent: 'topbar',
  name: 'ai-manage',
  title: 'ai-manage',
  icon: 'cluster',
  order: 0,
  desc: 'ai-manage',
  skipAuth: true,
};

const extensionConfig = {
  routes,
  menus: [menu],
  locales,
};

globals.context.registerExtension(extensionConfig);
