import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('users')
export class User extends Resource {
  public id: number | undefined;
  public username: string | undefined;
  public email: string | undefined;
  public password: string | undefined;
}
