import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/shared/interface/Task';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  private location = inject(Location);
  private _activatedRoute = inject(ActivatedRoute);
  private service = inject(ProfileService);



  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      const id = params['id'];
      this.getTaskDetail(Number(id));
    });
  }

  back(): void {
    this.location.back()
  }

  task!: Task;
  getTaskDetail(id: Number): void {
    this.service.getMessageTask(id).subscribe({
      next: (response: any) => {
        this.task = response
      },
      error: (err) => {
      }
    });
  }

}
