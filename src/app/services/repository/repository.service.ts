import {Injectable} from '@angular/core';
import {Repository} from "../../domain/repository";
import {AbstractMissionService} from "../abstract/abstract-mission-service";

@Injectable({
  providedIn: 'root'
})
export class RepositoryService extends AbstractMissionService<Repository> {

  constructor() {
    super(Repository);
  }

}
