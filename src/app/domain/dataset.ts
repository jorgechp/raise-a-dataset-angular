import {HateoasResource} from "@lagoshny/ngx-hateoas-client";
import {Repository} from "./repository";
import {GenericResource} from "./generic-resource";

@HateoasResource('datasets')
export class Dataset extends GenericResource {
  public name: string | undefined;
  public author: string | undefined;
  public description: string | undefined;
  public creationDate: string | undefined;
  public registrationDate: string | undefined;
  public authorInSystem: String[] | undefined;
  public repositories: Repository[] | undefined;
}
