import { EReduxActionTypes } from '../actions/user.actions';

export interface IReduxUserState {
    userId: any;
}

const UserInitialState: IReduxUserState = {
    userId: null
};

const setUserIdReducer = (
    state: IReduxUserState = UserInitialState,
    action: any
) => {
    switch (action.type) {
        case EReduxActionTypes.SET_USERID:
            return action.payload;

        default:
            return state;
    }
};

export { setUserIdReducer };