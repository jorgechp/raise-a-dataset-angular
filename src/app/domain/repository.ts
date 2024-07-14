import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('repositories')
export class Repository extends Resource {
  public id: number | string | undefined;
  public name: string | undefined;
  public description: string | undefined;
  public address: string | undefined;
  public addedBy: string | undefined;
}
