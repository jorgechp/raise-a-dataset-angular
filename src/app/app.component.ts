import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LayoutComponent} from "./components/layout/layout.component";
import {AuthenticationService} from "./services/authentication/authentication.service";
import {User} from "./domain/user";
import {UserRole} from "./domain/user-role";


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
      const newUser = new User();
      newUser.setRoles([UserRole.ROLE_GUEST]);
      authenticationService.storeCurrentUser(newUser);
    } else {
      authenticationService.loadCurrentUser();
    }
  }

}
