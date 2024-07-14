import {Injectable} from '@angular/core';
import {HateoasResourceOperation} from "@lagoshny/ngx-hateoas-client";
import {Repository} from "../../domain/repository";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RepositoryService extends HateoasResourceOperation<Repository> {

  constructor() {
    super(Repository);
  }

  public addRepository(repositoryToAdd: Repository): Observable<Repository> {
    return this.createResource({body: repositoryToAdd});
  }

}
