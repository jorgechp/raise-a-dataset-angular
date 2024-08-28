import { Injectable } from '@angular/core';
import {AbstractHateoasService} from "../abstract/abstract-hateoas.service";
import {FairPrinciple} from "../../domain/fair-principle";

@Injectable({
  providedIn: 'root'
})
export class FairPrincipleService extends AbstractHateoasService<FairPrinciple> {

  constructor() { super(FairPrinciple) }
}
