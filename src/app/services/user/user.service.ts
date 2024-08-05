import {Injectable} from '@angular/core';
import {User} from "../../domain/user";
import {AbstractHateoasService} from "../abstract/abstractHateoas.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractHateoasService<User> {

  constructor() { super(User); }

}
