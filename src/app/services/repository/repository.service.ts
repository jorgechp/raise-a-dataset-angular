import {Injectable} from '@angular/core';
import {Repository} from "../../domain/repository";
import {AbstractHateoasService} from "../abstract/abstractHateoas.service";

@Injectable({
  providedIn: 'root'
})
export class RepositoryService extends AbstractHateoasService<Repository> {

  constructor() {
    super(Repository);
  }

}
