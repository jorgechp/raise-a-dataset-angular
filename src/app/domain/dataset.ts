import {HateoasResource} from "@lagoshny/ngx-hateoas-client";
import {Repository} from "./repository";
import {User} from "./user";
import {AbstractDataset} from "./abstract-dataset";

@HateoasResource('datasets')
export class Dataset extends AbstractDataset {
  public maintainedBy: String[] | User[] | undefined;
  public repositories: Repository[] | undefined;
}
