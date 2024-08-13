import { Injectable } from '@angular/core';
import {AbstractHateoasService} from "../abstract/abstractHateoas.service";
import {Compliance} from "../../domain/compliance";

@Injectable({
  providedIn: 'root'
})
export class ComplianceService extends AbstractHateoasService<Compliance> {

  constructor() { super(Compliance) }
}
