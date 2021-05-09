import { Dispatch } from 'redux';

export enum EReduxActionTypes {
    SET_STUDENT = 'SET_STUDENT',
}

export const setStudent = (students: Object) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: EReduxActionTypes.SET_STUDENT,
            payload: students
        });
    };
};
