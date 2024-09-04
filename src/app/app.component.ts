import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LayoutComponent} from "./components/layout/layout.component";
import {AuthenticationService} from "./services/authentication/authentication.service";
import {MissionListenerService} from "./services/mission-listener/mission-listener.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MissionService} from "./services/mission/mission.service";
import {Mission} from "./domain/mission";
import {AbstractTranslationsComponent} from "./components/abstract/abstract-translations-component";
import {TranslocoService} from "@jsverse/transloco";
import {takeWhile} from "rxjs";
import {Role} from "./domain/role";
import {RoleService} from "./services/roles/roles.service";
import {getIdFromURI} from "./components/utils/funcions";
import {RaiseInstanceService} from "./services/raise-instance/raise-instance.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent extends AbstractTranslationsComponent {
  title = 'raise-a-dataset-angular';
  private missionCompletedMessage: any;

  constructor(private authenticationService: AuthenticationService,
              private missionListenerService: MissionListenerService,
              private raiseInstanceService: RaiseInstanceService,
              private snackBar: MatSnackBar,
              private missionService: MissionService,
              private roleService: RoleService,
              protected override translocoService: TranslocoService) {
    super(translocoService);
    if (!authenticationService.isCurrentUser()) {
      authenticationService.generateAndStoreGuestUser();
    } else {
      authenticationService.loadCurrentUser();
    }

    missionListenerService.missionAccomplishedSubject.subscribe(
      (response) => {
        response.forEach(missionRuleName => {

          missionService.searchResource('findMissionByRuleName', {
            params: {
              ruleName: missionRuleName
            },
          })
            .subscribe((mission: Mission) => {
              this.missionService.increaseIndicatorValue(-1);
              this.snackBar.open(this.missionCompletedMessage + ": " + mission.name, undefined,
                {
                  duration: 4000
                });
            });
        })
      }
    );

    if (this.authenticationService.isCurrentUser()) {
      const currentUser = this.authenticationService.getCurrentUser();
      this.missionService.getAcceptedMissionsByUser(
        Number(getIdFromURI(this.authenticationService.getCurrentUser().uri!))
        , currentUser.username!).subscribe();
      this.raiseInstanceService.getNextRaiseInstancesByUser(Number(getIdFromURI(this.authenticationService.getCurrentUser().uri!))
        , currentUser.username!).subscribe();
    }


    if (this.roleService.roles.size == 0) {
      this.roleService.getCollection().subscribe((response) => {
        response.resources.forEach((role: Role) => {
            this.roleService.addRole(role.name!, role)
          }
        );
      });
    }
  }

  protected loadTranslations(): void {
    this.translocoService.selectTranslate('missions.mission_completed').pipe(takeWhile(() => this.isAlive))
      .subscribe(value => this.missionCompletedMessage = value);
  }
}
