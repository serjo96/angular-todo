import { ADD_TODO, DELETE_TODO, UPDATE_TODO, TOGGLE_DONE, UPDATE_TODO_LIST, SHOW_FULL_TODO, CLOSE_FULL_TODO } from '../constants/constants';

export function addTODO(payload) {
    return {
        type: ADD_TODO,
        payload
    };
}
export function deleteTodo(payload) {
    return {
        type: DELETE_TODO,
        payload
    };
}
export function updateTodo(payload) {
    return {
        type: UPDATE_TODO,
        payload
    };
}
export function doneTodo(payload) {
    return {
        type: TOGGLE_DONE,
        payload
    };
}

export function updateList(payload) {
    return {
        type: UPDATE_TODO_LIST,
        payload
    };
}

export function showFullTodo(payload) {
    return {
        type: SHOW_FULL_TODO,
        payload
    };
}

export function closeFullTodo() {
    return {
        type: CLOSE_FULL_TODO
    };
}

