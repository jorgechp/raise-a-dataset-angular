import { Injectable } from '@angular/core';
import {AbstractHateoasService} from "../abstract/abstractHateoas.service";
import {Verification} from "../../domain/verification";

@Injectable({
  providedIn: 'root'
})
export class VerificationService extends AbstractHateoasService<Verification> {

  constructor() { super(Verification) }
}
