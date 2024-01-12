import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/shared/interface/Task';
import { ProfileService } from 'src/app/shared/service/profile.service';

import { Avartar } from '../../shared/interface/Avartar';
import { LocalTask } from 'src/app/shared/interface/LocalTopic';



@Component({

  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: Avartar;
  task: Task[] = [];
  local: LocalTask = { topic: '', description: '' };

  private _service = inject(ProfileService);
  private _router = inject(Router);
  ngOnInit(): void {
    this.getProFile()
    // this.getTask();
    this.getLocalstorage();
  }


  getProFile(): void {
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

  createtask(){
    this._router.navigate(['/create-task']),{
      
    }
  }

  getLocalstorage() {
    const cat = localStorage.getItem("key");

    if (cat !== null) {
      this.local = JSON.parse(cat);
      console.log(this.local)
    } else {
      console.log("ไม่พบข้อมูล")
    }
  }

  edittask(){
    this._router.navigate(['/edit-task']),{
      
    }
  }

  deleteTask(){
    const confirm = window.confirm('ต้องการลบใช่หรือไม่');
    if(confirm){
      localStorage.removeItem("key");
    }else{
      alert("ยกเลิก");
    }
    
  }

}
