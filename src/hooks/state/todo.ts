import { useDispatch } from 'react-redux';
import * as  todoActions from './../../bus/client/todos/actions';
import { Dispatch } from 'redux';
import { ToDoStateType } from '../../bus/client/todos/todo';
import { useSelector } from '../useSelector';

type HookType = {  dispatch: Dispatch } & typeof todoActions & { state: ToDoStateType };

export function useTodoState (): HookType {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.ToDos);

    return {
        dispatch,
        addTodo:          (value) => dispatch(todoActions.addTodo(value)),
        changeTodo:       (value) => dispatch(todoActions.changeTodo(value)),
        deleteTodo:       (value) => dispatch(todoActions.deleteTodo(value)),
        changeItemStatus: (value) => dispatch(todoActions.changeItemStatus(value)),
        state,
    };
}
