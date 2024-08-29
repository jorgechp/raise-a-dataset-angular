import {HateoasResource} from "@lagoshny/ngx-hateoas-client";
import {GenericResource} from "./generic-resource";

@HateoasResource('raiseInstances')
export class RaiseInstance extends GenericResource {
  public uniqueIdentifier: string | undefined;
  public dataset: string | undefined;
  public repository: string | undefined;
  public user: string | undefined;
  public date: string | undefined;
  public compliances: string[] | undefined;
  public isAgreeToRaise: boolean | undefined;
  public feedFrequencyInDays: number | undefined;
  public isInRisk: boolean | undefined;
  public nextFeedAction: string | undefined;
}
