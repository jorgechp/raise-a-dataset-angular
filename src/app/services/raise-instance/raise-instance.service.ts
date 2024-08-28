import {Injectable} from '@angular/core';
import {RaiseInstance} from "../../domain/raise-instance";
import {AbstractMissionService} from "../abstract/abstract-mission-service";

@Injectable({
  providedIn: 'root'
})
export class RaiseInstanceService extends AbstractMissionService<RaiseInstance> {

  constructor() {
    super(RaiseInstance);
  }
}
