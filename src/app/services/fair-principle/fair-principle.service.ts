import {Injectable} from '@angular/core';
import {AbstractHateoasService} from "../abstract/abstract-hateoas.service";
import {FairPrincipleIndicator} from "../../domain/fair-principle-indicator";

@Injectable({
  providedIn: 'root'
})
export class FairPrincipleService extends AbstractHateoasService<FairPrincipleIndicator> {

  constructor() {
    super(FairPrincipleIndicator)
  }
}
