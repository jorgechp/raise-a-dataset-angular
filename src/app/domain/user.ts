import {HateoasResource} from "@lagoshny/ngx-hateoas-client";
import {Authority} from "./authority";
import {UserRole} from "./user-role";
import {GenericResource} from "./generic-resource";

@HateoasResource('users')
export class User extends GenericResource {
  public username: string | undefined;
  public email: string | undefined;
  public password: string | undefined;
  public isAnonymous: boolean;
  public passwordReset: boolean | undefined;
  authorities: Authority[] = [];
  authorization = '';
  private acceptedMissions = [];
  private acomplishedMissions = [];


  constructor(values: object = {}) {
    super();
    this.isAnonymous = false;
    Object.assign(this as any, values);
  }

  isRole(roleName: string): boolean {
    return this.authorities.find((role) => {
      return role.authority === roleName
    }) !== undefined;
  }

  getRoles(): UserRole[] {
    return this.authorities.map(a => UserRole[a.authority as keyof typeof UserRole]);

  }

  setRoles(roles: UserRole[]) {
    this.authorities = roles.map(role => new Authority({authority: UserRole[role].toUpperCase()}));
  }
}
