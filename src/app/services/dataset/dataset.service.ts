import {Injectable} from '@angular/core';

import {Dataset} from "../../domain/dataset";
import {AbstractMissionService} from "../abstract/abstract-mission-service";


@Injectable({
  providedIn: 'root'
})
export class DatasetService extends AbstractMissionService<Dataset> {

  constructor() {
    super(Dataset);
  }
}
