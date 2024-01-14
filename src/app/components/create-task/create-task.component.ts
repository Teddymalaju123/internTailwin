import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit{
  validateForm!: FormGroup;
  private _router = inject(Router);
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      topic: new FormControl<string | null>(null, Validators.required),
      description: new FormControl<string | null>(null, Validators.required),
    });
  }


  createTopic() {
    if (this.validateForm.valid) {
      // ดึงข้อมูลที่มีอยู่ใน Local Storage ก่อน
      const storedData = localStorage.getItem("task");
      let existingData = storedData ? JSON.parse(storedData) : [];
  
      // คำนวณ ID ใหม่โดยใช้จำนวน Task ที่มีอยู่แล้ว
      const taskId = existingData.length + 1;
  
      // เพิ่มข้อมูลใหม่ลงในอาเรย์
      const newData = {
        id: taskId,
        ...this.validateForm.value,
        date: new Date().toISOString(), // เพิ่มเวลาปัจจุบัน
      };
  
      existingData = existingData.concat(newData);
  
      // บันทึกข้อมูลใหม่ลงใน Local Storage
      localStorage.setItem("task", JSON.stringify(existingData));
  
      this._router.navigate(['/profile']);
      alert("สร้าง Task เสร็จสิ้น");
    }
  }

  back(){
    this._router.navigate(['/profile'])
  }

  submit(){
    this._router.navigate(['/profile'])
  }
}
