import {GenericResource} from "./generic-resource";
import {HateoasResource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('validations')
export class Validation extends GenericResource {
    compliance?: string
    validationDate?: string
    validator?: string
    isPositive?: boolean;
    negativeComment?: String;
}
