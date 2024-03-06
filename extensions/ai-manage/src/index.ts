import routes from './routes';
import locales from './locales';

const menu = {
  parent: 'topbar',
  name: 'ai-manage/dashboard',
  title: 'AI_MANAGE',
  icon: 'computing',
  order: 0,
  desc: 'SUB_TITLE',
  skipAuth: true,
};

const extensionConfig = {
  routes,
  menus: [menu],
  locales,
};

globals.context.registerExtension(extensionConfig);
