import { TodoActionPayloadType, ToDoItem } from './todo';

export function addTodo(value: ToDoItem): TodoActionPayloadType {
    return {
        type: 'SET_ITEM',
        value,
    };
}

export function deleteTodo(value: ToDoItem): TodoActionPayloadType {
    return {
        type: 'DELETE_ITEM',
        value,
    };
}

export function changeTodo(value: ToDoItem): TodoActionPayloadType {
    return {
        type: 'CHANGE_ITEM',
        value,
    };
}

export function changeItemStatus(value: ToDoItem): TodoActionPayloadType {
    return {
        type: 'CHANGE_ITEM_STATUS',
        value,
    };
}
