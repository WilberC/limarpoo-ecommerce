import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.ngZone.run(() => {
          this.users = users;
          this.loading = false;
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.error = 'Failed to load users';
          this.loading = false;
        });
      },
    });
  }
}
