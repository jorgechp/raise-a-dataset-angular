import {GenericResource} from "./generic-resource";
import {User} from "./user";
import {HateoasResource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('compliances')
export class Compliance extends GenericResource {
    principle?: string
    author?: string
    instance?: string
    verificationDate?: string
}
