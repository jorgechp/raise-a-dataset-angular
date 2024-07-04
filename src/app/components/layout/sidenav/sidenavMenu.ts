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
  }
]
