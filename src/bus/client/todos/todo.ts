// === === === Imports === === ===
import {
    changeObjectItemInArray,
    deleteObjectItemInArray,
    pushItemToObjectArray,
} from '../../../utils/helpers';

// === === === Initial state === === ===
const initialState: ToDoStateType = [];

// === === === Types === === ===
export type ToDoItem = {
    id: string;
    isCompleted: boolean;
    text: string;
};
export type ToDoStateType = ToDoItem[];
export type ToDoActionTypes =
    'SET_ITEM' |
    'DELETE_ITEM' |
    'CHANGE_ITEM' |
    'CHANGE_ITEM_STATUS';

export type TodoActionPayloadType = {
    type: ToDoActionTypes,
    value: ToDoItem,
}

// === === === Type constants === === ===
const SET_ITEM = 'SET_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const CHANGE_ITEM = 'CHANGE_ITEM';
const CHANGE_ITEM_STATUS = 'CHANGE_ITEM_STATUS';

// === === === Reducer === === ===
export default function (state: ToDoStateType = initialState, payload: TodoActionPayloadType): ToDoStateType {
    const value = payload.value;
    switch (payload.type) {
        case SET_ITEM: return pushItemToObjectArray(state, value);
        case DELETE_ITEM: return deleteObjectItemInArray(state, value, 'id');
        case CHANGE_ITEM: return changeObjectItemInArray(state, value, 'id');
        case CHANGE_ITEM_STATUS: return changeObjectItemInArray(state, value, 'id');
        default: return state;
    }
}
