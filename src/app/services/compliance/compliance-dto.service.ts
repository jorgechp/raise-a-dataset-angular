import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {IComplianceDTO} from "../../domain/compliance-dto";
import {ApiConfiguration} from "../../config/api-configuration";


@Injectable({
  providedIn: 'root'
})
export class ComplianceDtoService {
  private configUrl: string = '';

  constructor(private http: HttpClient) {
    const baseUrl= `${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}`;
    this.configUrl = baseUrl + "compliances/search/retrieveAllComplianceDTO";
  }

  retrieveAllCompliancesDTO(): Observable<IComplianceDTO[]> {
    return this.http.get<IComplianceDTO[]>(this.configUrl);
  }
}
