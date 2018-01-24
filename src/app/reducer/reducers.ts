import { Action } from '@ngrx/store';
import {ADD_TODO, DELETE_TODO, UPDATE_TODO, TOGGLE_DONE, UPDATE_TODO_LIST, SHOW_FULL_TODO} from '../constants/constants'




let initialState = {
    arr: JSON.parse(localStorage.getItem('todoList')) || [],
    todoData: {id:0, status: false}
};

export function todoReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case ADD_TODO:
            return {...state, arr: [...state.arr, action.payload] };
        case DELETE_TODO:
            return {...state, arr:state.arr.filter((item, index) => index !== action.payload, ), todoData:{...state.todoData, status: false}};
        case UPDATE_TODO:
            return {...state, arr: state.arr.map((item, index) => {
                return index === action.payload.index
                    ? Object.assign({}, item,  action.payload.newValue)
                    : item;
            })};
        case TOGGLE_DONE:
            return {...state, arr:state.arr.map((item, index) => {
                return index === action.payload.index
                    ? Object.assign({}, item, { done: !action.payload.done })
                    : item;
            })};

        case UPDATE_TODO_LIST:
            return {...state, arr: [...action.payload]};

        case SHOW_FULL_TODO:
            return {...state, todoData: {id: action.payload, status: true} };

        default:
            return state;
    }
}
