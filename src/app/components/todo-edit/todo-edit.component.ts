import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-todo-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './todo-edit.component.html',
  styleUrl: './todo-edit.component.css'
})
export class TodoEditComponent implements OnInit {


  todoId: number = 0;


  todo: any = {
    id: '',
    title: '',
    description: '',
    completed: false,
  };


  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.todoId = Number(this.activatedRoute.snapshot.paramMap.get('id') as string);
   
    this.httpClient.get(`${environment.todolistApi}/${this.todoId}`)
      .subscribe({
        next: (data: any) => {
          this.form.patchValue(data);
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }


  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    completed: new FormControl('', [Validators.required]),
  });


  get f() {
    return this.form.controls;
  }


  onSubmit() {
    this.httpClient.put(`${environment.todolistApi}/${this.todoId}`, this.form.value)
    .subscribe({
      next: (data: any) => {
        this.todo = data;
      },
      error: (e) => {
        console.log(e.error);
      },
    });
  }
}

