import {Resource} from "@lagoshny/ngx-hateoas-client";

export class GenericResource extends Resource {
  public id: number | string | undefined;
  public uri: string | undefined;
}
