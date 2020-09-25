// Core
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// Reducers
import { togglersReducer as togglers } from '../../bus/client';
import { default as ToDos } from '../../bus/client/todos';

// Middlewares
import { middlewares } from './middlewares';

export const rootReducer = combineReducers({
    togglers,
    ToDos,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
