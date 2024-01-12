import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalTask } from 'src/app/shared/interface/LocalTopic';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit{

  validateForm!: FormGroup;
  private _router = inject(Router);
  constructor(private fb: FormBuilder) {};
  local: LocalTask = { topic: '', description: '' };

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      topic: new FormControl<string | null>(null, Validators.required),
      description: new FormControl<string | null>(null, Validators.required),
    });

    this.getLocalStorage();
  }

  getLocalStorage() {
    const cat = localStorage.getItem("key");

    if (cat !== null) {
      this.local = JSON.parse(cat);
      console.log(this.local);

      if (this.validateForm) {
        this.validateForm.patchValue(this.local);
      } else {
        console.error('Form is not initialized!');
      }
    } else {
      console.log("ไม่พบข้อมูล");
    }
  }

  editTopic(){
    if(this.validateForm.valid){
      localStorage.setItem("key",JSON.stringify(this.validateForm.value));
      this._router.navigate(['/profile'])
      alert("แก้ไขเสร็จสิ้น")
    }
    
  }

  back(){
    this._router.navigate(['/profile'])
  }

}
