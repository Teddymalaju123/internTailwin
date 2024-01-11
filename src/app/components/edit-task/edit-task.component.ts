import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit{

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
