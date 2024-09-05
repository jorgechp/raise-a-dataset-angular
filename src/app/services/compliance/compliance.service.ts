import { Injectable } from '@angular/core';
import {Compliance} from "../../domain/compliance";
import {AbstractMissionService} from "../abstract/abstract-mission-service";

@Injectable({
  providedIn: 'root'
})
export class ComplianceService extends AbstractMissionService<Compliance> {

  constructor() { super(Compliance) }
  }
