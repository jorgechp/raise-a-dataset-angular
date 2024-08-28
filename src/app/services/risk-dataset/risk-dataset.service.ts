import {Injectable} from '@angular/core';
import {RiskDataset} from "../../domain/risk-dataset";
import {AbstractMissionService} from "../abstract/abstract-mission-service";

@Injectable({
  providedIn: 'root'
})
export class RiskDatasetService extends AbstractMissionService<RiskDataset> {

  constructor() {
    super(RiskDataset)
  }
}
