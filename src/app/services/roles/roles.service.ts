import {Injectable} from '@angular/core';
import {AbstractHateoasService} from "../abstract/abstract-hateoas.service";
import {Role} from "../../domain/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends AbstractHateoasService<Role> {

  constructor() {
    super(Role);
    this._roles = new Map<string, Role>();
  }

  private _roles: Map<string, Role>;

  get roles(): Map<string, Role> {
    return this._roles;
  }

  set roles(value: Map<string, Role>) {
    this._roles = value;
  }

  public addRole(roleName: string, role: Role) {
    this._roles.set(roleName, role);
  }
}
