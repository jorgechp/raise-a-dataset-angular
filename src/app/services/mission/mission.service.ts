import {Injectable} from '@angular/core';
import {AbstractHateoasService} from "../abstract/abstractHateoas.service";
import {Mission} from "../../domain/mission";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class MissionService extends AbstractHateoasService<Mission> {

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
    super(Mission);
  }


  public checkMission(missionId: number, username: string) {
    const authorization = this.authService.generateAuthorization("demo", "password");
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      }),
      params: new HttpParams()
        .set('username', username)
    }
    return this.http.get<boolean>(`http://localhost:8080/missions/${missionId}/check`, httpOptions);
  };

  public checkAllMissions(username: string) {
    const authorization = this.authService.generateAuthorization("demo", "password");
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      }),
      params: new HttpParams()
        .set('username', username)
    }
    return this.http.get<boolean>(`http://localhost:8080/missions/check`, httpOptions);
  };
}
