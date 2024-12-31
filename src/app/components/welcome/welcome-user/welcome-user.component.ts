import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormField} from "@angular/material/form-field";
import {AutofocusDirective} from "../../../directives/autofocus.directive";
import {TranslocoDirective} from "@jsverse/transloco";

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

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getDatasetCount();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/datasets'], {queryParams: {query: this.searchQuery}}).then();
    }
  }

  getDatasetCount(): void {
    this.datasetCount = this.route.snapshot.data['datasetCountByUser'];
  }
}
