import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit{

  todoList : any[] = [];


  constructor(
    private httpClient: HttpClient
  ){    
  }


  ngOnInit(): void {
    this.httpClient.get(environment.todolistApi)
      .subscribe({
        next: (data) => {
          this.todoList = data as any[];
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }

  onDelete(id: number): void {
    if(confirm('Deseja realmente excluir a tarefa selecionada?')) {
      this.httpClient.delete(`${environment.todolistApi}/${id}`)
        .subscribe({
          next: (data: any) => {
            alert(`Tarefa '${data.title}', excluído com sucesso!`);
            this.ngOnInit();
          },
          error: (e) => {
            console.log(e.error);
          }
        })
    }
  }
}
