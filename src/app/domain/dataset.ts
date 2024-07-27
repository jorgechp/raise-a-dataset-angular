import {HateoasResource} from "@lagoshny/ngx-hateoas-client";
import {Repository} from "./repository";
import {GenericResource} from "./generic-resource";
import {User} from "./user";

@HateoasResource('datasets')
export class Dataset extends GenericResource {
  public name: string | undefined;
  public createdBy: string | undefined;
  public registeredBy: string | undefined;
  public description: string | undefined;
  public creationDate: string | undefined;
  public registrationDate: string | undefined;
  public maintainedBy: String[] | User[] | undefined;
  public repositories: Repository[] | undefined;
}
