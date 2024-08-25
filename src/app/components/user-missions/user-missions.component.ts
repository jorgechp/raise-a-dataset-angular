import {Component} from '@angular/core';
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {TranslocoDirective} from "@jsverse/transloco";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UserSectionLoginComponent} from "../user-section/user-section-login/user-section-login.component";
import {DomSanitizer} from "@angular/platform-browser";

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
  private readonly signUpDialogConfig = new MatDialogConfig();

  constructor(private dialog: MatDialog,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `social_leaderboard`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icons/social_leaderboard.svg")
    );
  }


  displaySignUpModal(): void {
    this.signUpDialogConfig.disableClose = true;
    this.signUpDialogConfig.autoFocus = true;
    this.signUpDialogConfig.data = {};

    const dialogRef = this.dialog.open(UserSectionLoginComponent,
      this.signUpDialogConfig);
  }

  doUserMissions() {

  }
}
