import { Component, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import {closeFullTodo, changeTodoData, doneTodo} from '../actions/todoActions';





@Component({
    selector: 'fullTodo',
    templateUrl: './fullTodo.html',
    host: {
        '(document:click)': 'onClick($event)',
    }
})
export class FullTodo {
    state = {todoData: {status: false}};
    todoData = {value: '', description: '', date: ''};
    closeClass = false;
    value: string;
    description: string;
    date = '';
    mask= [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

    constructor(private store: Store<any>, private _eref: ElementRef) {
        this.store.select('todoReducer').subscribe(state => {
            this.todoData = state.arr.filter((el)=> el.id === state.todoData.id).pop();
            this.value = this.todoData ? this.todoData.value : '';
            this.description = this.todoData ? this.todoData.description : '';
            this.date = this.todoData ? this.todoData.date : '';
            this.state = state
        });
    }



    onClick(event) {
        if (this.state.todoData.status && event.target.nodeName === 'HTML' || event.target.nodeName === 'APP-ROOT' || event.target.nodeName === 'MAIN'){
                this.closeClass = true;
            setTimeout(()=>{
                this.closeClass = false;
                this.store.dispatch(closeFullTodo())
            }, 700);
        }
    }
    toggleDone(todo) {
        this.store.dispatch(doneTodo({ id: todo.id, done: todo.done }));
    }

    changeTODO(name, id){
        console.log(123)
        let stringDate = name === 'date' ? moment(this.date).locale("ru").format("DD MMMM YYYY"): '';
        this.store.dispatch(changeTodoData({name, id, [name]: this[name], stringDate}));
    }
}
