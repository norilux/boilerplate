// Core
import { useQuery, useMutation, queryCache } from 'react-query';

// Api
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api';

// Types
import { Todos, CreateTodoInput, UpdateTodoInput } from './types';
import { useTodoState } from '../../hooks/state/todo';

export const useTodosQuery = () => {
    return useQuery('todos', fetchTodos);
};

export const useCreateTodo = () => {
    return useMutation((input: CreateTodoInput) => createTodo(input), {
        onSuccess: (createdTodo) => {
            const previousTodos: Todos | undefined = queryCache.getQueryData('todos');

            if (previousTodos) {
                queryCache.setQueryData('todos', () => [ createdTodo, ...previousTodos ]);
            }
        },
    });
};

export const useUpdateTodo = () => {
    const toDoState = useTodoState();

    return function (val: UpdateTodoInput) {
        updateTodo(val)
            .then((r) => toDoState.changeTodo(r))
            .catch((error) => error);
    };
    // return useMutation((input: UpdateTodoInput) => updateTodo(input), {
    //     onSuccess: (updatedTodo) => {
    //         const previousTodos: Todos | undefined = queryCache.getQueryData('todos');
    //
    //         if (previousTodos) {
    //             queryCache.setQueryData('todos', () => previousTodos.map((todo) => {
    //                 if (todo.id === updatedTodo.id) {
    //                     return updatedTodo;
    //                 }
    //
    //                 return todo;
    //             }));
    //         }
    //     },
    // });
};

export const useDeleteTodo = () => {
    const toDoState = useTodoState();

    return function (val: { id: string }) {
        const item = Object.assign({}, val, { isCompleted: false, text: '' });
        deleteTodo({ todoId: item.id })
            .then(() => toDoState.deleteTodo(item))
            .catch((error) => error);
    };
    // return useMutation((input: DeleteTodoInput) => deleteTodo(input), {
    //     onSuccess: (isTodoDeleted, { todoId }) => {
    //         if (!isTodoDeleted) {
    //             throw new Error('Todo delete failed.');
    //         }
    //
    //         const previousTodos: Todos | undefined = queryCache.getQueryData('todos');
    //         if (previousTodos) {
    //             queryCache.setQueryData('todos', () => previousTodos.filter(
    //                 (todo) => todo.id !== todoId,
    //             ));
    //         }
    //     },
    // });
};
