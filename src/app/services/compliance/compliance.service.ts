import {Injectable} from '@angular/core';
import {Compliance} from "../../domain/compliance";
import {AbstractMissionService} from "../abstract/abstract-mission-service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ApiConfiguration} from "../../config/api-configuration";
import {map} from "rxjs/operators";
import {AuthenticationService} from "../authentication/authentication.service";

import {IComplianceValidationDTO} from "../../domain/compliance-validation-DTO";


@Injectable({
  providedIn: 'root'
})
export class ComplianceService extends AbstractMissionService<Compliance> {
  private retrieveAllComplianceEndPoint: string = 'retrieveAllComplianceValidationStatus';

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super(Compliance)
  }

  retrieveAllComplianceValidationStatus(userId: number, username: string) {
    const authorization = this.authService.authorizationChain;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      }),
      params: new HttpParams()
        .set('userId', userId)
    }
    return this.http.get<IComplianceValidationDTO[]>(`${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}compliances/search/${this.retrieveAllComplianceEndPoint}`, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
