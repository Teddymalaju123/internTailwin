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
  tasksLocal: LocalTask[] = [];
  tasks: any[] = [];

  

  

  private _service = inject(ProfileService);
  private _router = inject(Router);
  ngOnInit(): void {
    this.getProFile()
    // this.getTask();
    // this.getLocalstorage();
    this.getTasks();
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

  getTasks() {
    const storedTasks = localStorage.getItem('task');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
    
    // เลือก task แรกเพื่อแสดงใน tasksLocal
    this.tasksLocal = this.tasks.length > 0 ? this.tasks[0] : { id: '', topic: '', description: '', date: '' };
  }

  

  // getTask(): void {
  //   this._service.getTask().subscribe({
  //     next: (response: any) => {
  //       this.task = response
  //     },
  //     error: (err) => {
  //     }
  //   });
  // }

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

  

  // getLocalstorage() {
  //   const cat = localStorage.getItem("key");

  //   if (cat !== null) {
  //     this.local = JSON.parse(cat);
  //     console.log(this.local)
  //   } else {
  //     console.log("ไม่พบข้อมูล")
  //   }
  // }

  edittask(taskID: number){
    this._router.navigate(['/edit-task'], {
      queryParams: {
        id: taskID
      }
    });
  }

  deleteTask(id: number): void {
    const confirmDelete = window.confirm('ต้องการลบใช่หรือไม่');
    
    if (confirmDelete) {
      // ดึงข้อมูลทั้งหมดจาก Local Storage
      const storedTasks = localStorage.getItem('task');
  
      if (storedTasks) {
        // แปลงข้อมูลทั้งหมดเป็น array
        const tasks: LocalTask[] = JSON.parse(storedTasks);
  
        // ค้นหา index ของ task ที่ตรงกับ ID ที่ต้องการลบ
        const taskIndex = tasks.findIndex(task => task.id === id);
  
        if (taskIndex !== -1) {
          // ลบ task ที่ต้องการ
          tasks.splice(taskIndex, 1);
  
          // บันทึกข้อมูลทั้งหมดลงใน Local Storage
          localStorage.setItem('task', JSON.stringify(tasks));
  
          alert('ลบ Task เสร็จสิ้น');
        } else {
          console.error('ไม่พบ Task ที่ตรงกับ ID ที่ต้องการลบ');
        }
      } else {
        console.error('ไม่พบข้อมูลทั้งหมด');
      }
    } else {
      alert('ยกเลิกการลบ');
    }
  }

}
