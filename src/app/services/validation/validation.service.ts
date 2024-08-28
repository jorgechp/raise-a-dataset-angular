import { Injectable } from '@angular/core';
import {AbstractHateoasService} from "../abstract/abstract-hateoas.service";
import {Validation} from "../../domain/validation";

@Injectable({
  providedIn: 'root'
})
export class ValidationService extends AbstractHateoasService<Validation> {

  constructor() { super(Validation) }
}
