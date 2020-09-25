// Core
import React, { FC, useEffect, useRef, useState } from 'react';

// Components
import { ErrorBoundary, Todo } from '../../components';

// Api
import { useUpdateTodo, useDeleteTodo } from '../../bus/todos';
import { createTodo } from '../../bus/todos/api';

// Redux
import { useTogglersRedux } from '../../bus/client/togglers';

// Elements
import { Button, Spinner } from '../../elements';

// Styles
import { Container, Header } from './styles';
import { useTodoState } from '../../hooks/state/todo';
import { fetchTodos } from '../../bus/todos/api';

const Main: FC = () => {
    const [ text, setText ] = useState<string>('');
    const headerRef = useRef<HTMLElement>(null);
    const { togglersRedux: { isOnline }} = useTogglersRedux();
    const todoState = useTodoState();
    useEffect(() => {
        fetchTodos()
            .then((r) => {
                r.reverse().map((item) => todoState.addTodo(item));
            })
            .catch((error) => error);
    }, []);

    //todoState.addTodo({});

    const data = todoState.state;
    // const { data, isLoading: isTodosLoading } = useTodosQuery();
    //const [ createTodo, { isLoading: isCreateTodoLoading }] = useCreateTodo();
    const updateTodo = useUpdateTodo();
    const deleteTodo = useDeleteTodo();

    // const isLoading //isTodosLoading
    //       = //isCreateTodoLoading
    //     || isUpdateTodoLoading
    //     || isDeleteTodoLoading;
    // console.log(data);
    // if (!data || isLoading) {
    //     return <Spinner />;
    // }

    const onCreate = () => {
        if (text !== '') {
            createTodo({ body: { text }})
                .then((r) => todoState.addTodo(r))
                .catch((error) => error);
            setText('');
        }
    };

    return (
        <Container>
            {false && <Spinner absolute />}
            <Header ref = { headerRef }>
                <nav />
                <input
                    value = { text }
                    onChange = { (event) => void setText(event.target.value) }
                />
                <nav>
                    <Button
                        disabled = { !isOnline }
                        title = 'Create TODO'
                        onClick = { onCreate }>
                        CREATE
                    </Button>
                </nav>
            </Header>
            <main>
                {
                    data.map((todo, index) => (
                        <Todo
                            isColor = { Boolean(index % 2) }
                            key = { todo.id }
                            { ...todo }
                            deleteHandler = { () => void deleteTodo({ id: todo.id }) }
                            updateHandler = { () => void updateTodo({
                                todoId: todo.id,
                                body:   { isCompleted: !todo.isCompleted },
                            }) }
                        />
                    ))
                }
            </main>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <Main />
    </ErrorBoundary>
);
