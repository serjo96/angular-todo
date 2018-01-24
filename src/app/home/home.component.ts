import { Component, OnInit, HostListener  } from '@angular/core';
import { Store } from '@ngrx/store';
import { SortablejsOptions } from 'angular-sortablejs';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import * as moment from 'moment';


import {addTODO, deleteTodo, doneTodo, updateTodo, updateList, showFullTodo} from '../actions/todoActions';



@Component({
  selector: 'home',
    templateUrl: './home.html',
    providers: [
        // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
        // `MatMomentDateModule` in your applications root module. We provide it at the component level
        // here, due to limitations of our example generation script.
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    ],
})
export class HomeComponent implements OnInit {
    todo: string;
    todoDescr: string;
    todoDate: string;
    todoID = 0;
    editing = false;
    indexToEdit: number | null;
    currentTime = new Date();
    state = [];
    mask= [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

    constructor(private store: Store<any>) {
        this.store.select('todoReducer').subscribe(state => this.state = state.arr);
    }

    ngOnInit(){}

    @HostListener('window:unload')
    doSomething() {
        localStorage.setItem('todoList', JSON.stringify(this.state));
    }


    addTodo(value, description, date) {
        let stringDate = moment(date).locale("ru").format("DDD MMMM YYYY");
        this.todoID = Math.floor(Math.random() * 5000);
        this.store.dispatch(addTODO({ value, description, date, stringDate, id: this.todoID, done: false }));
        this.todo = '';
        this.todoDate = '';
        this.todoDescr = '';

    }

    deleteTodo(index) {
        this.store.dispatch(deleteTodo(index));
    }

    editTodo(todo, index) {
        this.editing = true;
        this.todo = todo.value;
        this.todoDate = todo.date;
        this.todoDescr = todo.description;
        this.indexToEdit = index;
    }

    cancelEdit() {
        this.editing = false;
        this.todo = '';
        this.indexToEdit = null;
    }

    updateTodo(value, description, date) {
        let stringDate = moment(date).locale("ru").format("DDD MMMM YYYY");
        this.store.dispatch(updateTodo({ index: this.indexToEdit, newValue: {value, description, date, stringDate} }) );
        this.todo = '';
        this.todoDate = '';
        this.todoDescr = '';
        this.indexToEdit = null;
        this.editing = false;
    }

    toDate(string){
        let date = new Date(Date.parse(string)).toUTCString();
        return new Date(date)
    }

    showTodoData(indx){
        this.store.dispatch(showFullTodo(indx));
    }

    eventOptions: SortablejsOptions = {
        onUpdate: () =>   {
            let arr = this.state;
            this.store.dispatch(updateList(arr))

        }
    };


    toggleDone(todo) {
        this.store.dispatch(doneTodo({ id: todo.id, done: todo.done }));
    }
}
