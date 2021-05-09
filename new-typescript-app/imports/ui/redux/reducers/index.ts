
import { combineReducers } from 'redux';
import { setUserIdReducer } from './user.reducers';
import { setStudentReducer } from './student.reducers';

const rootReducer = combineReducers({
    setStudentReducer,
    userId: setUserIdReducer
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;