import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/admin',
    iconComponent: { name: 'cil-home' },
  },
  {
    name: 'Create user',
    url: '/admin/user-add',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Services',
    url: '/admin/user-services',
    iconComponent: { name: 'cil-drop' }
  }
];
