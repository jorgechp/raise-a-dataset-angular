import {HateoasResource} from "@lagoshny/ngx-hateoas-client";
import {GenericResource} from "./generic-resource";
import {UserRole} from "./user-role";

@HateoasResource('roles')
export class Role extends GenericResource {
  name?: string;


  constructor(name?: UserRole) {
    super();
    if (name) {
      this.name = name.valueOf();
    }
  }
}
