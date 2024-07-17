import {HateoasResourceOperation, Resource} from "@lagoshny/ngx-hateoas-client";
import {Observable} from "rxjs";

export abstract class AbstractHateoasService<T extends Resource> extends HateoasResourceOperation<T> {

  public add(elementToAdd: T): Observable<T> {
    return this.createResource({body: elementToAdd});
  }
}
