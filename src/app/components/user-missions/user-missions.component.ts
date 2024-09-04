import {Component, OnInit} from '@angular/core';
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {TranslocoDirective} from "@jsverse/transloco";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {MatBadgeModule} from "@angular/material/badge";
import {MissionService} from "../../services/mission/mission.service";
import {RaiseInstanceService} from "../../services/raise-instance/raise-instance.service";

@Component({
  selector: 'app-user-missions',
  standalone: true,
  imports: [
    MatIcon,
    NgIf,
    TranslocoDirective,
    MatBadgeModule
  ],
  templateUrl: './user-missions.component.html',
  styleUrl: './user-missions.component.scss'
})
export class UserMissionsComponent implements OnInit {
  badgeRaise: string | number | undefined | null;
  badgeMissions: string | number | undefined | null;

  constructor(private router: Router,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private raiseInstanceService: RaiseInstanceService,
              private missionService: MissionService) {
    this.matIconRegistry.addSvgIcon(
        `volunteer_activism`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icons/volunteer_activism.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `social_leaderboard`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icons/social_leaderboard.svg")
    );
  }

  ngOnInit(): void {
    this.missionService.indicatorValueObservable.subscribe(
      (result: number) => {
        this.badgeMissions = (result > 0) ? result : undefined;
      }
    )

    this.raiseInstanceService.indicatorValueObservable.subscribe(
      (result: number) => {
        this.badgeRaise = (result > 0) ? result : undefined;
      }
    )
  }

  doUserRaise() {
    this.router.navigate(['/raiseActions']).then();
  }

  doUserMissions() {
      this.router.navigate(['/missions']).then();
  }

}
