import {GenericResource} from "./generic-resource";
import {FairCategoriesEnum} from "./fair-categories-enum";
import {HateoasResource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('fAIRPrincipleIndicators')
export class FairPrincipleIndicator extends GenericResource {
    namePrefix?: string
    name?: string
    description?: string
    url?: string
    category?: FairCategoriesEnum
    difficulty?: number
}
