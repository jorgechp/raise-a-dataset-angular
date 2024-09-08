import {GenericResource} from "./generic-resource";
import {HateoasResource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('compliances')
export class Compliance extends GenericResource {
    principle?: string
    author?: string
    instance?: string
    verificationDate?: string
}
