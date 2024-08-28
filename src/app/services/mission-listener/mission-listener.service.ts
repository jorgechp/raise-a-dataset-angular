import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MissionListenerService {
  private _missionAccomplishedSubject = new BehaviorSubject<string[]>([]);
  private missionAccomplishedObservable: Observable<string[]> = this._missionAccomplishedSubject.asObservable();


  get missionAccomplishedSubject(): Observable<string[]> {
    return this.missionAccomplishedObservable;
  }

  updateValue(newValue: string[]) {
    return this._missionAccomplishedSubject.next(newValue);
  }
}
