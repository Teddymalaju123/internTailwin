import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalTask } from 'src/app/shared/interface/LocalTopic';
import { Location } from '@angular/common'

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})

export class EditTaskComponent implements OnInit {

  validateForm!: FormGroup;
  private _router = inject(Router);
  constructor(private fb: FormBuilder) { };
  tasksLocal: LocalTask[] = [];
  id!: number


  private location = inject(Location);
  private _activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.validateForm = this.fb.group({
        topic: new FormControl<string | null>(null, Validators.required),
        description: new FormControl<string | null>(null, Validators.required),
    });

    this._activatedRoute.queryParams.subscribe(params => {
        this.id = +params['id']; // ใส่เครื่องหมาย + เพื่อแปลงเป็น number
        console.log("Received ID:", this.id, typeof this.id);

        this.getTaskById(this.id);
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
          this.validateForm.patchValue({
              topic: foundTask.topic,
              description: foundTask.description
          });

          // ตั้งค่า tasksLocal ด้วยข้อมูลที่ได้
          this.tasksLocal = [foundTask];
      } else {
          console.error('ไม่พบ Task ที่ตรงกับ ID');
      }
  } else {
      console.error('ไม่พบข้อมูลทั้งหมด');
  }
}

editTask(): void {
  // ตรวจสอบว่า validateForm ถูกต้อง
  if (this.validateForm && this.validateForm.valid) {
      // ดึงข้อมูลทั้งหมดจาก Local Storage
      const storedData = localStorage.getItem('task');

      if (storedData) {
          const tasks: LocalTask[] = JSON.parse(storedData);

          // ค้นหา index ของ task ที่ตรงกับ ID ที่ต้องการแก้ไข
          const taskIndex = tasks.findIndex(task => task.id === this.id);

          if (taskIndex !== -1) {
              // แก้ไขข้อมูล topic และ description ใน tasks ด้วยค่าจาก validateForm
              tasks[taskIndex].topic = this.validateForm.value.topic;
              tasks[taskIndex].description = this.validateForm.value.description;

              // กำหนดเวลาที่แก้ไขใน properties date
              tasks[taskIndex].date = new Date().toISOString();

              // บันทึกข้อมูลทั้งหมดลงใน Local Storage
              localStorage.setItem('task', JSON.stringify(tasks));

              // clear tasksLocal
              this.tasksLocal = [];
              this._router.navigate(['/profile'])
              alert('แก้ไข Task เสร็จสิ้น');
          } else {
              console.error('ไม่พบ Task ที่ตรงกับ ID ที่ต้องการแก้ไข');
          }
      } else {
          console.error('ไม่พบข้อมูลทั้งหมด');
      }
  } else {
      console.error('กรุณากรอกข้อมูลให้ครบถ้วน');
  }
}
  back() {
    this.location.back()
  }

}
