import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  message = '';
  visible = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification$.subscribe(message => {
      this.show(message);
    });
  }

  show(message: string, duration: number = 2000) {
    this.message = message;
    this.visible = true;
    setTimeout(() => this.visible = false, duration);
  }
}
