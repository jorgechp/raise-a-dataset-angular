import {HateoasResource} from "@lagoshny/ngx-hateoas-client";
import {GenericResource} from "./generic-resource";

@HateoasResource('missions')
export class Mission extends GenericResource {
  name?: string;
  description?: string;
  points?: number;
  ruleName?: string;
}
