import {GenericResource} from "./generic-resource";
import {User} from "./user";
import {HateoasResource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('fAIRPrincipleVerificationInstances')
export class FairPrincipleVerificationInstance extends GenericResource {
    verifiers?: User[]
    fairPrinciple?: string
    author?: string
    instance?: string
}
