import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/shared/interface/Task';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { Location } from '@angular/common'
import { LocalTask } from 'src/app/shared/interface/LocalTopic';
@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  task!: Task;
  tasksLocal: LocalTask[] = [];
  
  private location = inject(Location);
  private _activatedRoute = inject(ActivatedRoute);
  private _service = inject(ProfileService);



  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      const id = params['id'];
      console.log(id);
      this.getTaskById(Number(id));
    });
  }

  back(): void {
    this.location.back()
  }

  
  getTaskDetail(id: Number): void {
    this._service.getMessageTask(id).subscribe({
      next: (response: any) => {
        this.task = response
      },
      error: (err) => {
      }
    });
  }

  getTaskById(id: number): void {
    // ดึงข้อมูลทั้งหมดจาก Local Storage
    console.log('Calling getTaskById with ID:', id);
    const storedData = localStorage.getItem('task');
    console.log('Stored Data from localStorage:', storedData);
  
    if (storedData) {
        const tasks: LocalTask[] = JSON.parse(storedData);
  
        // ค้นหา task ที่ตรงกับ ID ที่รับมา
        const foundTask = tasks.find(task => task.id === id);
  
        if (foundTask) {
            // ตั้งค่าฟอร์ม validateForm ด้วยข้อมูลที่ได้
            console.log('Found Task:', foundTask);
            // ตั้งค่า tasksLocal ด้วยข้อมูลที่ได้
            this.tasksLocal = [foundTask];
        } else {
            console.error('ไม่พบ Task ที่ตรงกับ ID');
        }
    } else {
        console.error('ไม่พบข้อมูลทั้งหมด');
    }
  }

}
