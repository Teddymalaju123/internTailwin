import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit{

  private _router = inject(Router);
  
  ngOnInit(): void {
    
  }


  back(){
    this._router.navigate(['/profile'])
  }

  submit(){
    this._router.navigate(['/profile'])
  }
}
