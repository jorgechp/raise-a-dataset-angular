import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-feed-select-principles',
  standalone: true,
  imports: [
    MatCardModule,
    NgClass
  ],
  templateUrl: './feed-select-principles.component.html',
  styleUrl: './feed-select-principles.component.scss'
})
export class FeedSelectPrinciplesComponent {

  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() difficulty: number | undefined;
  @Input() isSelected?: boolean = false;

  constructor() {
  }
}

