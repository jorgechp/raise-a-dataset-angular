import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";
import {Authority} from "./authority";

@HateoasResource('users')
export class User extends Resource {
  public id: number | undefined;
  public username: string | undefined;
  public email: string | undefined;
  public password: string | undefined;
  passwordReset = false;
  authorities: Authority[] = [];
  authorization = '';

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

  getRoles(): string[] {
    return this.authorities.map(a => a.authority.split('_')[1].toLowerCase());
  }

  setRoles(roles: string) {
    this.authorities = roles.split(',').map(role => new Authority({authority: 'ROLE_' + role.toUpperCase().trim()}));
  }
}
