import {Component} from '@angular/core';
import {TranslocoDirective} from "@jsverse/transloco";

@Component({
  selector: 'app-raise-dataset-intro',
  standalone: true,
  imports: [
    TranslocoDirective
  ],
  templateUrl: './raise-dataset-intro.component.html',
  styleUrl: './raise-dataset-intro.component.scss'
})
export class RaiseDatasetIntroComponent {

}
