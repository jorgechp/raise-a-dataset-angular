import {Injectable} from '@angular/core';

import {Dataset} from "../../domain/dataset";
import {AbstractHateoasService} from "../abstract/abstractHateoas.service";

@Injectable({
  providedIn: 'root'
})
export class DatasetService extends AbstractHateoasService<Dataset> {

  constructor() {
    super(Dataset)
  }
}
