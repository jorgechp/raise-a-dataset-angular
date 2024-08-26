import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {TranslocoDirective} from "@jsverse/transloco";
import {MissionService} from "../../services/mission/mission.service";
import { Mission } from '../../domain/mission';
import {CommonModule} from "@angular/common";
import { HttpMethod } from '@lagoshny/ngx-hateoas-client';
import { forkJoin, tap } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import { User } from '../../domain/user';
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
    if(!this.user) return;

  }

  doUnselectMission(i: number) {
    if(!this.user) return;
    const missionToUnselect = this.userMissions?.at(i);
    if(missionToUnselect){
      this.userService.getResource(this.username!).subscribe(
          (user) => {
            this.user?.deleteRelation('missionsAccepted', missionToUnselect).subscribe();
          }
      )
    }
  }
}
