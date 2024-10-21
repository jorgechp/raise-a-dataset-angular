import {Component} from '@angular/core';
import {TranslocoDirective} from "@jsverse/transloco";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-raise-dataset-intro',
  standalone: true,
  imports: [
    TranslocoDirective,
    RouterLink
  ],
  templateUrl: './raise-dataset-intro.component.html',
  styleUrl: './raise-dataset-intro.component.scss'
})
export class RaiseDatasetIntroComponent {

}
