import {GenericResource} from "./generic-resource";
import {User} from "./user";
import {HateoasResource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('verifications')
export class Verification extends GenericResource {
    verifiers?: User[]
    principle?: string
    author?: string
    instance?: string
    verificationDate?: string
    isPositive?: boolean
    negativeComment?: string
}
