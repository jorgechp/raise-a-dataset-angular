import {Component, OnInit} from '@angular/core';
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

  protected acceptedMissions?: Array<Mission>;
  protected allMissions?: Array<Mission>;
  protected accomplishedMissions?: Array<Mission>;


  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private missionsService: MissionService) {
  }

  ngOnInit(): void {
    this.username = this.authenticationService.getCurrentUser().username!;
    const userId = Number(getIdFromURI(this.authenticationService.getCurrentUser().uri!));
    this.userService.getResource(userId)
      .subscribe((user) => {
        this.user = user;
        this.loadAllMissions(userId);
      });
  }

  private loadAllMissions(userId: number) {
    if(!this.username || !this.user) return;
    const acceptedMissions$ = this.missionsService.getAcceptedMissionsByUser(userId,this.username);
    const accomplishedMissions$ = this.missionsService.getAccomplishedMissionsByUser(userId,this.username);
    const otherMissions$ = this.missionsService.getOtherMissionsForUser(userId,this.username);

    forkJoin([acceptedMissions$, otherMissions$, accomplishedMissions$]).pipe(
        tap(([userMissions, otherMissions, accomplishedMissions]) => {
          this.acceptedMissions = userMissions._embedded?.missions ?? [];
          this.allMissions = otherMissions._embedded?.missions ?? [];
          this.accomplishedMissions = accomplishedMissions._embedded?.missions ?? [];
        })
    ).subscribe();
  }

  doSelectMission(i: number) {
    const missionToSelect = this.allMissions?.at(i);
    if (missionToSelect && this.user) {
      this.user.addCollectionRelation('missionsAccepted', [missionToSelect]).subscribe(
          () => {
            this.allMissions?.splice(i,1);
            this.acceptedMissions?.push(missionToSelect);
          }
      );

    }

  }

  doUnselectMission(i: number) {
    const missionToUnselect = this.acceptedMissions?.at(i);
    if (missionToUnselect && this.user) {
      this.user.deleteRelation('missionsAccepted', missionToUnselect).subscribe(() => {
        this.acceptedMissions?.splice(i,1);
        this.allMissions?.unshift(missionToUnselect);
        this.missionsService.increaseIndicatorValue(-1);
      });
    }
  }


}
