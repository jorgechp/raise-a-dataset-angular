import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {TranslocoDirective} from "@jsverse/transloco";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {getIdFromURI} from "../utils/funcions";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {User} from "../../domain/user";
import {forkJoin, tap} from "rxjs";
import {RaiseInstanceService} from "../../services/raise-instance/raise-instance.service";
import {RaiseInstanceDTO} from "../../domain/raise-instance-dto";

@Component({
  selector: 'app-raise-actions',
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
    MatDialogClose
  ],
  templateUrl: './raise-actions.component.html',
  styleUrl: './raise-actions.component.scss'
})
export class RaiseActionsComponent {
  private user?: User;
  private username?: string;

  protected outdatedRaiseInstances?: RaiseInstanceDTO[];
  protected nextRaiseInstances?: RaiseInstanceDTO[];
  protected noContractRaiseInstances?: RaiseInstanceDTO[];


  constructor(private router: Router,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private raiseInstance: RaiseInstanceService) {
  }

  ngOnInit(): void {
    this.username = this.authenticationService.getCurrentUser().username!;
    const userId = Number(getIdFromURI(this.authenticationService.getCurrentUser().uri!));
    this.userService.getResource(userId)
        .subscribe((user) => {
          this.user = user;
          this.loadAllTasks(userId);
        });
  }

  private loadAllTasks(userId: number) {
    if(!this.user) return;

    const outdatedRaiseInstances$ = this.raiseInstance.getOutdatedRaiseInstancesByUser(userId,this.username!);
    const nextRaiseInstances$ = this.raiseInstance.getNextRaiseInstancesByUser(userId,this.username!);
    const noContractRaiseInstances$ = this.raiseInstance.getNoContractedRaiseInstancesByUser(userId,this.username!);

    forkJoin([outdatedRaiseInstances$, nextRaiseInstances$, noContractRaiseInstances$]).pipe(
        tap(([outdatedRaiseInstances,nextRaiseInstances,noContractRaiseInstances]) => {
          this.outdatedRaiseInstances = outdatedRaiseInstances ?? [];
          this.nextRaiseInstances = nextRaiseInstances ?? [];
          this.noContractRaiseInstances = noContractRaiseInstances ?? [];
        })
    ).subscribe();
  }

  doRaiseAction(instance: RaiseInstanceDTO) {
    this.router.navigate(['instance/' + instance.id], {}).then();
  }
}
