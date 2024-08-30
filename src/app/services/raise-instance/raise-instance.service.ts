import {Injectable} from '@angular/core';
import {RaiseInstance} from "../../domain/raise-instance";
import {AbstractMissionService} from "../abstract/abstract-mission-service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {ApiConfiguration} from "../../config/api-configuration";
import { RaiseInstanceDTO} from "../../domain/raise-instance-dto";

export interface RaiseInstanceResponse {
  _embedded: {
    missions: RaiseInstance[];
  };
}
@Injectable({
  providedIn: 'root'
})
export class RaiseInstanceService extends AbstractMissionService<RaiseInstance> {
  private readonly outdatedRaiseInstanceEndPoint = `raiseInstances/search/findAllByIsAgreeToRaiseIsTrueAndNextFeedActionBeforeCurrentDate`;
  private readonly nextRaiseInstanceEndPoint = `raiseInstances/search/findAllByIsAgreeToRaiseIsTrueAndNextFeedActionAfterCurrentDate`;
  private readonly noContractRaiseInstanceEndPoint = `raiseInstances/search/findAllByIsAgreeToRaiseAndUserId`;

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super(RaiseInstance);
  }

  getOutdatedRaiseInstancesByUser(userId: number, username: string) {
    const authorization = this.authService.authorizationChain;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      }),
      params: new HttpParams()
          .set('userId', userId)
    }
    return this.http.get<RaiseInstanceDTO[]>(`${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}${this.outdatedRaiseInstanceEndPoint}`, httpOptions);

  }


  getNextRaiseInstancesByUser(userId: number, username: string ) {
    const authorization = this.authService.authorizationChain;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      }),
      params: new HttpParams()
          .set('userId', userId)
    }
    return this.http.get<RaiseInstanceDTO[]>(`${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}${this.nextRaiseInstanceEndPoint}`, httpOptions);
  }

  getNoContractedRaiseInstancesByUser(userId: number, username: string) {
    const authorization = this.authService.authorizationChain;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      }),
      params: new HttpParams()
          .set('isAgreeToRaise', false)
          .set('userId', userId)
    }
    return this.http.get<RaiseInstanceDTO[]>(`${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}${this.noContractRaiseInstanceEndPoint}`, httpOptions);
  }
}
