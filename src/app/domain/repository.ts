import {HateoasResource} from "@lagoshny/ngx-hateoas-client";
import {Dataset} from "./dataset";
import {GenericResource} from "./generic-resource";

@HateoasResource('repositories')
export class Repository extends GenericResource {
  public name: string | undefined;
  public description: string | undefined;
  public address: string | undefined;
  public addedBy: string | undefined;
  public datasets: Dataset[] | undefined;
}
