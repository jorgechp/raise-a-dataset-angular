import {Injectable} from '@angular/core';
import {Mission} from "../../domain/mission";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {ApiConfiguration} from "../../config/api-configuration";
import {map} from "rxjs/operators";
import {AbstractIndicatorService} from "../abstract/abstract-indicator.service";

export interface MissionsResponse {
  _embedded: {
    missions: Mission[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class MissionService extends AbstractIndicatorService<Mission> {

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
    super(Mission);
  }


  public checkMission(missionId: number, username: string) {
    const authorization = this.authService.authorizationChain;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      }),
      params: new HttpParams()
        .set('username', username)
    }
    return this.http.get<boolean>(`${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}missions/${missionId}/check`, httpOptions);
  };

  public checkAllMissions(username: string) {
    const authorization = this.authService.authorizationChain;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      }),
      params: new HttpParams()
          .set('username', username)
    }
    return this.http.get<string[]>(`${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}missions/check`, httpOptions);
  };

  getAcceptedMissionsByUser(idUser: number, username: string) {
    const authorization = this.authService.authorizationChain;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      }),
      params: new HttpParams()
          .set('idUser', idUser)
    }
    return this.http.get<MissionsResponse>(`${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}missions/acceptedByUser/${idUser}`, httpOptions)
      .pipe(
        map(response => {
          this.updateIndicatorValue(response._embedded.missions.length);
          return response;
        })
      );
  }

  getAccomplishedMissionsByUser(idUser: number, username: string) {
    const authorization = this.authService.authorizationChain;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      }),
      params: new HttpParams()
          .set('idUser', idUser)
    }
    return this.http.get<MissionsResponse>(`${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}missions/accomplishedByUser/${idUser}`, httpOptions);
  }

  getOtherMissionsForUser(idUser: number, username: string) {
    const authorization = this.authService.authorizationChain;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      }),
      params: new HttpParams()
          .set('idUser', idUser)
    }
    return this.http.get<MissionsResponse>(`${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}missions/othersForUser/${idUser}`, httpOptions);
  }
}
