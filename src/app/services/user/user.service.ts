import {Injectable} from '@angular/core';
import {User} from "../../domain/user";
import {Observable} from "rxjs";
import {HateoasResourceOperation} from "@lagoshny/ngx-hateoas-client";

@Injectable({
  providedIn: 'root'
})
export class UserService extends HateoasResourceOperation<User>  {

  constructor() { super(User); }

  public addUser(userToAdd: User): Observable<User> {
    return this.createResource({body: userToAdd } );
  }

}
