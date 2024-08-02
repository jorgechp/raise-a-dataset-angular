import {GenericResource} from "./generic-resource";
import {FairCategoriesEnum} from "./fair-categories-enum";

export class FairPrinciple extends GenericResource {
    namePrefix?: string
    name?: string
    description?: string
    url?: string
    category?: FairCategoriesEnum
    difficulty?: number
}
