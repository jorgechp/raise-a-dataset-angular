import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConfiguration} from "../../config/api-configuration";
import {Observable} from "rxjs";
import {IUserStateDTO} from "../../domain/user-state-dto";

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private baseUrl: string;
  private readonly rankingUrl = 'ranking/users';

  constructor(private http: HttpClient) {
    this.baseUrl = `${ApiConfiguration.protocol}://${ApiConfiguration.host}:${ApiConfiguration.port}${ApiConfiguration.apiRoot}`;
  }

  getRankingUsers(): Observable<IUserStateDTO[]> {
    return this.http.get<IUserStateDTO[]>(this.baseUrl + this.rankingUrl);
  }
}
