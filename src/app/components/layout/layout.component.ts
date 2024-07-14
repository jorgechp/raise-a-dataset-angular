import {Component, inject, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AsyncPipe} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatGridListModule} from "@angular/material/grid-list";
import {UserSectionComponent} from "../user-section/user-section.component";
import {ISidenavMenuItem, SIDENAV_MENU} from "./sidenav/sidenavMenu";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {RepositoryComponent} from "../repository/repository/repository.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatGridListModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    UserSectionComponent,
    RepositoryComponent
  ]
})
export class LayoutComponent implements OnInit {
  rootRoutes: ISidenavMenuItem[] = SIDENAV_MENU;
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService.currentUserSubscription.subscribe((user) => {
      const userRoles = user.getRoles();
      this.rootRoutes = SIDENAV_MENU;
      this.rootRoutes = this.rootRoutes.filter(route => {
        return userRoles.includes(route.role);
      });
    });
  }



}
