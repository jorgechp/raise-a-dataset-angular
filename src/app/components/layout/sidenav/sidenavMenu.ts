import {UserRole} from "../../../domain/user-role";

export interface ISidenavMenuItem {
  isActive: boolean;
  routeLink: string;
  title: string;
  role: UserRole;
}

export const SIDENAV_MENU: ISidenavMenuItem[] = [
  {
    title: 'Sign up',
    isActive: true,
    role: UserRole.ROLE_GUEST,
    routeLink: 'signup'
  },
  {
    title: 'Raise',
    isActive: true,
    role: UserRole.ROLE_USER,
    routeLink: 'raise'
  },
  {
    title: 'Datasets',
    isActive: true,
    role: UserRole.ROLE_USER,
    routeLink: 'datasets'
  }, {
    title: 'FAIR principles',
    isActive: true,
    role: UserRole.ROLE_USER,
    routeLink: 'principles'
  }, {
    title: 'Validate',
    isActive: true,
    role: UserRole.ROLE_USER,
    routeLink: 'compliances'
  }, {
    title: 'Rescue',
    isActive: true,
    role: UserRole.ROLE_USER,
    routeLink: 'rescue'
  }, {
    title: 'Admin',
    isActive: true,
    role: UserRole.ROLE_ADMIN,
    routeLink: 'admin'
  },
]
