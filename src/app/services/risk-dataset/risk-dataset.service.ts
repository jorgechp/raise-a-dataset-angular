import {Injectable} from '@angular/core';
import {AbstractHateoasService} from "../abstract/abstractHateoas.service";
import {RiskDataset} from "../../domain/risk-dataset";

@Injectable({
  providedIn: 'root'
})
export class RiskDatasetService extends AbstractHateoasService<RiskDataset> {

  constructor() {
    super(RiskDataset)
  }
}
