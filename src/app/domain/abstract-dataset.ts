import {GenericResource} from "./generic-resource";

export abstract class AbstractDataset extends GenericResource {
  public name: string | undefined;
  public createdBy: string | undefined;
  public registeredBy: string | undefined;
  public description: string | undefined;
  public creationDate: string | undefined;
  public registrationDate: string | undefined;
}
