import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNavbarComponent } from "./shared/bottom-navbar/bottom-navbar.component";
import { NotificationComponent } from "./shared/notification/notification.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BottomNavbarComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'menuApp';
}
