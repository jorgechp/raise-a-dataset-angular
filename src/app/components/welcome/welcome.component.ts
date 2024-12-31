import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {WelcomeGuestComponent} from './welcome-guest/welcome-guest.component';
import {WelcomeUserComponent} from './welcome-user/welcome-user.component';
import {NgIf} from '@angular/common';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    WelcomeGuestComponent,
    WelcomeUserComponent,
    NgIf
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit, OnDestroy {
  isGuest: boolean = true;
  private userSuscription: Subscription | undefined;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.userSuscription = this.authService.currentUserSubscription.subscribe(() => {
      this.isGuest = !this.authService.isCurrentUser();
    });
  }

  ngOnDestroy(): void {
    if (this.userSuscription) {
      this.userSuscription.unsubscribe();
    }
  }
}
