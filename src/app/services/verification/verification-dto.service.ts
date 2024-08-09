import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {IVerificationDto} from "../../domain/verification-dto";
import {ApiConfiguration} from "../../config/api-configuration";


@Injectable({
  providedIn: 'root'
})
export class VerificationDtoService {
  private configUrl: string = '';

  constructor(private http: HttpClient) {
    const baseUrl= `${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}`;
    this.configUrl = baseUrl + "verifications/search/retrieveAllVerificationInstanceDTO";
  }

  retrieveAllVerificationInstanceDTO(): Observable<IVerificationDto[]> {

    return this.http.get<IVerificationDto[]>(this.configUrl);
  }
}
