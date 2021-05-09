import { Dispatch } from 'redux';

export enum EReduxActionTypes {
    SET_USERID = 'SET_USERID',
}

export const setUserId = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: EReduxActionTypes.SET_USERID,
            payload: id
        });
    };
};