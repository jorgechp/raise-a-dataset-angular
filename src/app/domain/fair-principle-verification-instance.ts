import {GenericResource} from "./generic-resource";
import {User} from "./user";

export class FairPrincipleVerificationInstance extends GenericResource {
    verifiers?: User[]
    fairPrinciple?: string
    author?: string
    raiseInstance?: string
}
