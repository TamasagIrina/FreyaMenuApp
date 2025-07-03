import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BottomNavbarComponent } from "./shared/bottom-navbar/bottom-navbar.component";
import { NotificationComponent } from "./shared/notification/notification.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BottomNavbarComponent, NotificationComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'menuApp';

   showNavbar = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
      
        this.showNavbar = event.urlAfterRedirects !== '/login';
      }
    });
  }
}
