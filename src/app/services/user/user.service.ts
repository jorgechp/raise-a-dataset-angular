import {Injectable} from '@angular/core';
import {User} from "../../domain/user";
import {AbstractHateoasService} from "../abstract/abstractHateoas.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractHateoasService<User> {


  constructor(private http: HttpClient) {
    super(User);
  }
}
