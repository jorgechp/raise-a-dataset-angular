import {UserRole} from "../../../domain/user-role";

export interface ISidenavMenuItem {
  isActive: boolean;
  routeLink: string;
  title: string;
  roles: Array<UserRole>;
}

export const SIDENAV_MENU: ISidenavMenuItem[] = [
  {
    title: 'Start',
    isActive: true,
    roles: [UserRole.ROLE_GUEST, UserRole.ROLE_USER, UserRole.ROLE_ADMIN],
    routeLink: 'welcome'
  },
  {
    title: 'Sign up',
    isActive: true,
    roles: [UserRole.ROLE_GUEST],
    routeLink: 'signup'
  },
  {
    title: 'Raise',
    isActive: true,
    roles: [UserRole.ROLE_USER],
    routeLink: 'raise'
  },
  {
    title: 'Datasets',
    isActive: true,
    roles: [UserRole.ROLE_USER],
    routeLink: 'datasets'
  }, {
    title: 'Validate',
    isActive: true,
    roles: [UserRole.ROLE_USER],
    routeLink: 'compliances'
  }, {
    title: 'Rescue',
    isActive: true,
    roles: [UserRole.ROLE_USER],
    routeLink: 'rescue'
  }, {
    title: 'Admin',
    isActive: true,
    roles: [UserRole.ROLE_ADMIN],
    routeLink: 'admin'
  }, {
    title: 'FAIRpedia',
    isActive: true,
    roles: [UserRole.ROLE_USER],
    routeLink: 'principles'
  }
]
