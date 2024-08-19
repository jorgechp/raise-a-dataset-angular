import {Injectable} from '@angular/core';
import {User} from "../../domain/user";
import {AbstractHateoasService} from "../abstract/abstractHateoas.service";
import {HttpClient} from "@angular/common/http";
import {ApiConfiguration} from "../../config/api-configuration";

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractHateoasService<User> {

  private changePasswordUrl: string;

  constructor(private http: HttpClient) {
    super(User);
    const baseUrl = `${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}`;
    this.changePasswordUrl = baseUrl + "password";
  }

  public changePassword(currentPassword: string, newPassword: string) {
    return this.http.post<User>(this.changePasswordUrl, {
      currentPassword: currentPassword,
      newPassword: newPassword
    })
  }

}
