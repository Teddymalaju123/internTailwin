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
        this.id = +params['id'];
        console.log("Received ID:", this.id, typeof this.id);
        this.getTaskById(this.id);
    });
}

getTaskById(id: number): void {
  console.log('Calling getTaskById with ID:', id);
  const storedData = localStorage.getItem('task');
  console.log('Stored Data from localStorage:', storedData);
  if (storedData) {
      const tasks: LocalTask[] = JSON.parse(storedData);
      const foundTask = tasks.find(task => task.id === id);
      if (foundTask) {
          console.log('Found Task:', foundTask);
          this.validateForm.patchValue({
              topic: foundTask.topic,
              description: foundTask.description
          });
          this.tasksLocal = [foundTask];
      } else {
          console.error('ไม่พบ Task ที่ตรงกับ ID');
      }
  } else {
      console.error('ไม่พบข้อมูลทั้งหมด');
  }
}

editTask(): void {
  if (this.validateForm && this.validateForm.valid) {
      const storedData = localStorage.getItem('task');

      if (storedData) {
          const tasks: LocalTask[] = JSON.parse(storedData);
          const taskIndex = tasks.findIndex(task => task.id === this.id);

          if (taskIndex !== -1) {
              tasks[taskIndex].topic = this.validateForm.value.topic;
              tasks[taskIndex].description = this.validateForm.value.description;
              tasks[taskIndex].date = new Date().toISOString();
              localStorage.setItem('task', JSON.stringify(tasks));
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
