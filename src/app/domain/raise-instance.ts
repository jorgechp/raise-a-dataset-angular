import {HateoasResource} from "@lagoshny/ngx-hateoas-client";
import {GenericResource} from "./generic-resource";

@HateoasResource('raiseInstances')
export class RaiseInstance extends GenericResource {
  public doi: string | undefined;
  public dataset: string | undefined;
  public repository: string | undefined;
  public user: string | undefined;
  public date: string | undefined;
  public compliances: string[] | undefined;
}
