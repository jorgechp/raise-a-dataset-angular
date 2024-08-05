import {Injectable} from '@angular/core';
import {AbstractHateoasService} from "../abstract/abstractHateoas.service";
import {RaiseInstance} from "../../domain/raise-instance";

@Injectable({
  providedIn: 'root'
})
export class RaiseInstanceService extends AbstractHateoasService<RaiseInstance> {

  constructor() {
    super(RaiseInstance);
  }
}
