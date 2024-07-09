import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {User} from "../../domain/user";
import {UserRole} from "../../domain/user-role";
import {BehaviorSubject, Subject} from "rxjs";

export interface ILoginData {
  uri: "/users/demo",
  username: "demo",
  email: "demo@sample.app",
  authorities: [],
  accountNonExpired: boolean,
  credentialsNonExpired: boolean,
  accountNonLocked: boolean,
  enabled: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly CURRENT_USER_KEY = 'currentUser';
  private _userSubject = new BehaviorSubject<User>(new User());


  constructor(private http: HttpClient) {
  }

  get currentUserSubscription(): Subject<User> {
    return this._userSubject;
  }

  generateAuthorization(username: string, password: string): string {
    return `Basic ${btoa(`${username}:${password}`)}`;
  }

  login(username: string, password: string): Observable<User> {
    const authorization = this.generateAuthorization(username, password);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorization
      })
    };
    return this.http.get(`http://localhost:8080/identity`, httpOptions).pipe(
      map(data => {
        const loginData = data as ILoginData;
        const user: User = new User();
        user.authorization = authorization;
        user.authorities = loginData.authorities;
        user.username = loginData.username;
        this.storeCurrentUser(user);
        return user;
      })
    );
  }

  storeCurrentUser(user: User): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    this._userSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.CURRENT_USER_KEY) !== null;
  }

  isCurrentUser(): boolean {
    return localStorage.getItem(this.CURRENT_USER_KEY) !== null;
  }

  getCurrentUser(): User {
    return new User(JSON.parse(localStorage.getItem(this.CURRENT_USER_KEY)!));
  }

  getCurrentUserRoles(): UserRole[] {
    return this.getCurrentUser().getRoles();
  }

  loadCurrentUser() {
    this._userSubject.next(this.getCurrentUser());
  }

  generateAndStoreGuestUser(): void {
    const guestUser = new User();
    guestUser.setRoles([UserRole.ROLE_GUEST]);
    this.storeCurrentUser(guestUser);
  }
}
