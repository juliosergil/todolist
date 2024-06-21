import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-todo-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.css',
})
export class TodoAddComponent {
 
  todo: any = {
    id: '',
    title: '',
    description: '',
    completed: false,
  };


  constructor(private httpClient: HttpClient) {}


  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    completed: new FormControl('', [Validators.required]),
  });


  get f() {
    return this.form.controls;
  }


  onSubmit() {
    this.httpClient.post(environment.todolistApi, this.form.value).subscribe({
      next: (data: any) => {
        this.todo = data;
        this.form.reset();
      },
      error: (e) => {
        console.log(e.error);
      },
    });
  }
}
