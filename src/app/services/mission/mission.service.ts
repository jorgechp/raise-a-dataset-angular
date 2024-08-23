import {Injectable} from '@angular/core';
import {AbstractHateoasService} from "../abstract/abstractHateoas.service";
import {Mission} from "../../domain/mission";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {User} from "../../domain/user";

@Injectable({
  providedIn: 'root'
})
export class MissionService extends AbstractHateoasService<Mission> {

  constructor(private http: HttpClient) {
    super(Mission);
  }

  public checkMissions(){
    return this.http.post<User>(`http://localhost:8080/missions/check`,{
      userId: '1',
      missionId: '1'
    }).subscribe();

  }

}
