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

    constructor(private store: Store<any>, private _eref: ElementRef) {
        this.store.select('todoReducer').subscribe(state => {
            this.todoDate = state.arr.filter((el)=> el.id === state.todoData.id).pop();
            this.state = state
        });
    }
    onClick(event) {
        if (!this._eref.nativeElement.contains(event.target) && event.target.className.indexOf('todo') !== 0){
            this.store.dispatch(closeFullTodo());

        } // or some similar check
    }

    ngOnInit() {}

}
