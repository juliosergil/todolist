import { Routes } from '@angular/router';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';

export const routes: Routes = [
    {
        path: 'pages/todo/add',
        component: TodoAddComponent
    },
    {
        path: 'pages/todo/list',
        component: TodoListComponent
    },
    {
        path: 'pages/todo/edit/:id',
        component: TodoEditComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/pages/todo/list'
    }
];
