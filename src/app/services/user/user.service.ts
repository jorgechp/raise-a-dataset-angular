import {Injectable} from '@angular/core';
import {User} from "../../domain/user";
import {AbstractHateoasService} from "../abstract/abstract-hateoas.service";
import {HttpClient} from "@angular/common/http";
import {Mission} from "../../domain/mission";
import {ApiConfiguration} from "../../config/api-configuration";
import {Observable} from "rxjs";
import {HttpMethod} from "@lagoshny/ngx-hateoas-client";

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractHateoasService<User> {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    super(User);
    this.baseUrl = `${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}`;
  }

  public addMissionToUser(idUser: number, mission: Mission) {
    return this.http.post<void>(`${this.baseUrl}users/${idUser}/missionsAccepted`, mission);
  }

  public deleteMissionFromUser(idUser: number, idMission: number) {
    return this.http.delete<void>(`${this.baseUrl}users/${idUser}/missionsAccepted/${idMission}`);
  }

  public countUsers(): Observable<number> {
    return this.customQuery<number>(HttpMethod.GET, '/search/countAll');
  }

  getUserScore(userId: number) {
    const params = {userId: userId.toString()};
    return this.customQuery<number>(HttpMethod.GET, '/search/getUserScore', undefined, {params});
  }

  getUserRankingPosition(userId: number) {
    const params = {userId: userId.toString()};
    return this.customQuery<number>(HttpMethod.GET, '/search/countUsersWithHigherScore', undefined, {params});
  }
}
