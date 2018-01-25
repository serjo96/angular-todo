import { Action } from '@ngrx/store';
import {ADD_TODO, DELETE_TODO, UPDATE_TODO, TOGGLE_DONE, UPDATE_TODO_LIST, SHOW_FULL_TODO, CLOSE_FULL_TODO, CHANGE_TODO_DATA} from '../constants/constants'




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
            return {...state, arr:state.arr.map((item) => {
                return item.id === action.payload.id
                    ? Object.assign({}, item, { done: !action.payload.done })
                    : item;
            })};

        case UPDATE_TODO_LIST:
            return {...state, arr: [...action.payload]};

        case SHOW_FULL_TODO:
            return {...state, todoData: {id: action.payload, status: true} };

        case CLOSE_FULL_TODO:
            return {...state, todoData: {...state.todoData, status: false} };

        case CHANGE_TODO_DATA:
            return  {...state, arr: state.arr.map((item) => {
                return item.id === action.value.id
                    ? {...item, [action.value.name]: action.value[action.value.name], stringDate: action.value.stringDate ? action.value.stringDate : item.stringDate}
                    : item;
                })};



        default:
            return state;
    }
}
