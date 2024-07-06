import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LayoutComponent} from "./components/layout/layout.component";
import {AuthenticationService} from "./services/authentication/authentication.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'raise-a-dataset-angular';

  constructor(private authenticationService: AuthenticationService) {
    if (!authenticationService.isCurrentUser()) {
      authenticationService.generateAndStoreGuestUser();
    } else {
      authenticationService.loadCurrentUser();
    }
  }

}
