import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle,} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {TranslocoDirective} from "@jsverse/transloco";
import {MissionService} from "../../services/mission/mission.service";
import {Mission} from '../../domain/mission';
import {CommonModule} from "@angular/common";
import {HttpMethod} from '@lagoshny/ngx-hateoas-client';
import {forkJoin, tap} from 'rxjs';
import {UserService} from '../../services/user/user.service';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {User} from '../../domain/user';
import {getIdFromURI} from "../utils/funcions";

@Component({
  selector: 'app-user-missions-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    TranslocoDirective,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './user-missions-dialog.component.html',
  styleUrl: './user-missions-dialog.component.scss'
})
export class UserMissionsDialogComponent implements OnInit{
  private username?: string;
  private user?: User;

  protected userMissions?: Array<Mission>;
  protected suggestedMissions?: Array<Mission>;
  protected allMissions?: Array<Mission>;
  protected accomplishedMissions?: Array<Mission>;



  constructor(private router: Router,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private missionsService: MissionService) {
  }

  onCancelClick() {
    this.router.navigate(['/settings']).then();
  }

  ngOnInit(): void {
    this.username = this.authenticationService.getCurrentUser().username!
    this.userService.getResource(Number(getIdFromURI(this.authenticationService.getCurrentUser().uri!)))
      .subscribe((user) => {
        this.user = user;
      });
    this.loadAllMissions();

  }

  private loadAllMissions() {
    if(!this.username) return;
    const userMissions$ = this.missionsService.customSearchQuery<Mission[]>(HttpMethod.GET, '/getMissionsForUser', undefined, { params: { username: this.username } });
    const otherMissions$ = this.missionsService.customSearchQuery<Mission[]>(HttpMethod.GET, '/getOtherMissionsForUser', undefined, { params: { username: this.username } });
    const accomplishedMissions$ = this.missionsService.customSearchQuery<Mission[]>(HttpMethod.GET, '/getMissionsAcomplishedByUser', undefined, { params: { username: this.username } });

    forkJoin([userMissions$, otherMissions$, accomplishedMissions$]).pipe(
        tap(([userMissions, otherMissions, accomplishedMissions]) => {
          this.userMissions = userMissions;
          this.allMissions = otherMissions;
          this.accomplishedMissions = accomplishedMissions;
        })
    ).subscribe();
  }

  doSelectMission(i: number) {
    const missionToSelect = this.allMissions?.at(i);
    if (missionToSelect && this.user) {
      this.userService.addMission(Number(getIdFromURI(this.authenticationService.getCurrentUser().uri!)), missionToSelect).subscribe(
        (response) => {
          console.log(response)
        }
      );

    }

  }

  doUnselectMission(i: number) {
    const missionToUnselect = this.userMissions?.at(i);
    if (missionToUnselect && this.user) {
      this.userService.deleteMission(Number(getIdFromURI(this.authenticationService.getCurrentUser().uri!)),
        Number(getIdFromURI(missionToUnselect.uri!))).subscribe(
        (response) => {
          this.userMissions?.splice(i);
          this.allMissions?.unshift(missionToUnselect);
        }
      );
    }
  }
}
