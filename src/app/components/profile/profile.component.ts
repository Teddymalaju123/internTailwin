import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/shared/interface/Task';
import { ProfileService } from 'src/app/shared/service/profile.service';

import { Avartar } from '../../shared/interface/Avartar';



@Component({

  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private service = inject(ProfileService);
  private router = inject(Router);
  ngOnInit(): void {
    this.getReportProblem()
    this.getTask();
  }

  profile!: Avartar;
  getReportProblem(): void {
    this.service.getProfile().subscribe({
      next: (response: any) => {
        this.profile = response;
      },
      error: (err) => {
      }
    });
  }

  task: Task[] = [];
  getTask(): void {
    this.service.getTask().subscribe({
      next: (response: any) => {
        this.task = response
      },
      error: (err) => {
      }
    });
  }

  detail(task: Task) {
    this.router.navigate(['/profile-detail'], {
      queryParams: {
        id: task.id
      }
    });
  }

}
