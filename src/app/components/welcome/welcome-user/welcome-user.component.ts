import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormField} from "@angular/material/form-field";
import {AutofocusDirective} from "../../../directives/autofocus.directive";
import {TranslocoDirective} from "@jsverse/transloco";
import {UserService} from "../../../services/user/user.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {getIdFromURI} from "../../utils/funcions";

@Component({
  selector: 'app-welcome-user',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatFormField,
    MatButtonModule,
    MatInputModule,
    AutofocusDirective,
    TranslocoDirective
  ],
  templateUrl: './welcome-user.component.html',
  styleUrl: './welcome-user.component.scss'
})
export class WelcomeUserComponent implements OnInit {
  searchQuery: string = '';
  datasetCount: number = 0;
  userScore: number = 0;
  userRankingPosition: number = 0;

  private userId: number = 0;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.userId = Number(getIdFromURI(this.authenticationService.getCurrentUser().uri!));
    this.getDatasetCount();
    this.getUserScore();
    this.getUserRanking();

  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/datasets'], {queryParams: {query: this.searchQuery}}).then();
    }
  }

  getDatasetCount(): void {
    this.datasetCount = this.route.snapshot.data['datasetCountByUser'];
  }

  getUserScore(): void {
    this.userService.getUserScore(this.userId).subscribe(score => this.userScore = score);
  }

  getUserRanking(): void {

    // We must add 1 to the ranking position because the ranking starts at 0.
    this.userService.getUserRankingPosition(this.userId)
      .subscribe(score => this.userRankingPosition = score + 1);
  }
}
