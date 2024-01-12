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


  createTopic(){
    if(this.validateForm.valid){
      localStorage.setItem("key",JSON.stringify(this.validateForm.value));
      this._router.navigate(['/profile'])
      alert("สร้างTaskเสร็จสิ้น")
    }
    
  }

  back(){
    this._router.navigate(['/profile'])
  }

  submit(){
    this._router.navigate(['/profile'])
  }
}
