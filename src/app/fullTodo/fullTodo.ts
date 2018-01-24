import { Component, OnInit, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import {closeFullTodo} from '../actions/todoActions';





@Component({
    selector: 'fullTodo',
    templateUrl: './fullTodo.html',
    host: {
        '(document:click)': 'onClick($event)',
    }
})
export class FullTodo implements OnInit {
    state = {};
    todoDate = {};
    closeClass = false;

    constructor(private store: Store<any>, private _eref: ElementRef) {
        this.store.select('todoReducer').subscribe(state => {
            this.todoDate = state.arr.filter((el)=> el.id === state.todoData.id).pop();
            this.state = state
        });
    }
    onClick(event) {
        console.log(event)
        if (this.state.todoData.status && event.target.nodeName === 'HTML' || event.target.nodeName === 'APP-ROOT' || event.target.nodeName === 'MAIN'){
                this.closeClass = true;
            setTimeout(()=>{
                this.closeClass = false
                this.store.dispatch(closeFullTodo())
            }, 700);

        }
    }

    ngOnInit() {}

}
