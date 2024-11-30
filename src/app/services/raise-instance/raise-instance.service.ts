import {Injectable} from '@angular/core';
import {RaiseInstance} from "../../domain/raise-instance";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {ApiConfiguration} from "../../config/api-configuration";
import {RaiseInstanceDTO} from "../../domain/raise-instance-dto";
import {AbstractIndicatorService} from "../abstract/abstract-indicator.service";
import {map} from "rxjs/operators";
import {VerificationRequestDTO} from "../../domain/verification-request-dto";

export interface RaiseInstanceResponse {
  _embedded: {
    missions: RaiseInstance[];
  };
}
@Injectable({
  providedIn: 'root'
})
export class RaiseInstanceService extends AbstractIndicatorService<RaiseInstance> {
  private readonly outdatedRaiseInstanceEndPoint = `raiseInstances/search/findAllByIsAgreeToRaiseIsTrueAndNextFeedActionBeforeCurrentDate`;
  private readonly nextRaiseInstanceEndPoint = `raiseInstances/search/findAllByIsAgreeToRaiseIsTrueAndNextFeedActionAfterCurrentDate`;
  private readonly noContractRaiseInstanceEndPoint = `raiseInstances/search/findAllByIsAgreeToRaiseAndUserId`;
  private readonly allRaiseInstanceEndPoint = `raiseInstances/search/findAllRaiseInstancesDTO`;
  private readonly verifyRaiseInstanceEndPoint = `verify`;

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
    return this.http.get<RaiseInstanceDTO[]>(`${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}${this.nextRaiseInstanceEndPoint}`, httpOptions).pipe(
      map(response => {
        this.updateIndicatorValue(response.length);
        return response;
      })
    );
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

  getAllRaiseInstances() {
    const authorization = this.authService.authorizationChain;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      }),
      params: new HttpParams()
    }
    return this.http.get<RaiseInstanceDTO[]>(`${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}${this.allRaiseInstanceEndPoint}`, httpOptions);
  }

  verifyRaiseInstance(instanceId: number, uri: string, indicatorId?: number) {
    const authorization = this.authService.authorizationChain;
    const body: VerificationRequestDTO = {
      instanceId: instanceId,
      indicatorId: indicatorId,
      uri: uri
    } as VerificationRequestDTO;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      }),
      params: new HttpParams()
    }
    return this.http.post<RaiseInstanceDTO[]>(`${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}${this.verifyRaiseInstanceEndPoint}`, body, httpOptions);
  }
}
