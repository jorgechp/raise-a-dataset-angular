import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {IComplianceDTO} from "../../domain/compliance-dto";
import {ApiConfiguration} from "../../config/api-configuration";


@Injectable({
  providedIn: 'root'
})
export class ComplianceDtoService {
  private allCompliancesDTOUrl: string = '';
  private retrieveAllComplianceDTOEvaluatedByRaiseInstanceUrl: string = '';
  private retrieveAllComplianceDTONotEvaluatedByRaiseInstanceUrl: string = '';

  constructor(private http: HttpClient) {
    const baseUrl= `${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}`;
    this.allCompliancesDTOUrl = baseUrl + "compliances/search/retrieveAllComplianceDTO";
    this.retrieveAllComplianceDTOEvaluatedByRaiseInstanceUrl = baseUrl + "compliances/search/retrieveAllComplianceDTOEvaluatedByRaiseInstance";
    this.retrieveAllComplianceDTONotEvaluatedByRaiseInstanceUrl = baseUrl + "compliances/search/retrieveAllComplianceDTONotEvaluatedByRaiseInstance";
  }

  retrieveAllComplianceDTOEvaluatedByRaiseInstance(): Observable<IComplianceDTO[]> {
    return this.http.get<IComplianceDTO[]>(this.retrieveAllComplianceDTOEvaluatedByRaiseInstanceUrl);
  }

  retrieveAllComplianceDTONotEvaluatedByRaiseInstance(): Observable<IComplianceDTO[]> {
    return this.http.get<IComplianceDTO[]>(this.retrieveAllComplianceDTONotEvaluatedByRaiseInstanceUrl);
  }

  retrieveAllCompliancesDTO(): Observable<IComplianceDTO[]> {
    return this.http.get<IComplianceDTO[]>(this.allCompliancesDTOUrl);
  }
}
