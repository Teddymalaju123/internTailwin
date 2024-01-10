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
  profile!: Avartar;
  task: Task[] = [];

  private _service = inject(ProfileService);
  private _router = inject(Router);
  ngOnInit(): void {
    this.getReportProblem()
    this.getTask();
  }


  getReportProblem(): void {
    this._service.getProfile().subscribe({
      next: (response: any) => {
        this.profile = response;
      },
      error: (err) => {
      }
    });
  }

  getTask(): void {
    this._service.getTask().subscribe({
      next: (response: any) => {
        this.task = response
      },
      error: (err) => {
      }
    });
  }

  detail(task: Task) {
    this._router.navigate(['/profile-detail'], {
      queryParams: {
        id: task.id
      }
    });
  }

}
