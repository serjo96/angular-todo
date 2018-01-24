import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';






@Component({
  selector: 'fullTodo',
    templateUrl: './fullTodo.html'
})
export class FullTodo implements OnInit {
    state = {};
    todoDate = {};

    constructor(private store: Store<any>) {
        this.store.select('todoReducer').subscribe(state => {
            this.todoDate = state.arr.filter((el)=> el.id === state.todoData.id).pop();
            this.state = state
        });

    }

    ngOnInit() {


    }

}
