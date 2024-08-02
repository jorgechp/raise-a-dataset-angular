import { Injectable } from '@angular/core';
import {AbstractHateoasService} from "../abstract/abstractHateoas.service";
import {FairPrincipleVerificationInstance} from "../../domain/fair-principle-verification-instance";

@Injectable({
  providedIn: 'root'
})
export class FairPrincipleVerificationService extends AbstractHateoasService<FairPrincipleVerificationInstance> {

  constructor() { super(FairPrincipleVerificationInstance) }
}
