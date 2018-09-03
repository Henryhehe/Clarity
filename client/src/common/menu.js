import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    path: 'workplace',
    authority: 'donor',
  },
  // our own pages
  {
    name: 'Dashboard',
    icon: 'dashboard',
    path: 'charitydashboard',
    authority: 'charity'
  },
  {
    name: 'Donate',
    icon: 'smile-o',
    path: 'donate',
    authority: ['donor','charity'],
  },
  {
    name: 'Tax',
    icon: 'file-text',
    path: 'tax',
    authority: ['donor', 'government'],
  },
  {
    name: 'Tax',
    icon: 'file-text',
    path: 'charitytax',
    authority: 'charity',
  },
  {
    name: 'Deposit',
    icon: 'profile',
    path: 'step-form',
    authority: 'donor'
  },
  {
    name: 'User',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: 'Login',
        path: 'login',
      },
      {
        name: 'Register',
        path: 'register',
      },
      {
        name: 'Register-result',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
