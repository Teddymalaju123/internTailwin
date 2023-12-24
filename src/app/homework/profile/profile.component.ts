import { Component, OnInit, inject } from '@angular/core';
import { ProfileService } from './service/profile.service';
import { Avartar } from './interface/Avartar';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{
  private service = inject(ProfileService);
  profile: Avartar[] = [];

  getReportProblem(): void {
    this.service.getProfile().subscribe({
      next: (response: any) => {
        this.profile = response;
      },
      error: (err) => {
      }
    });
  }

}
