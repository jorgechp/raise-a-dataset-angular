import {Component} from '@angular/core';
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {TranslocoDirective} from "@jsverse/transloco";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-missions',
  standalone: true,
  imports: [
    MatIcon,
    NgIf,
    TranslocoDirective
  ],
  templateUrl: './user-missions.component.html',
  styleUrl: './user-missions.component.scss'
})
export class UserMissionsComponent {

  constructor(private router: Router,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `social_leaderboard`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icons/social_leaderboard.svg")
    );
  }

  doUserMissions() {
      this.router.navigate(['/missions']).then();
  }
}
