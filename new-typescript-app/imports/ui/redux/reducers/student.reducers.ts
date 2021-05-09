import { EReduxActionTypes } from '../actions/student.actions';

export interface IReduxStudentState {
    students: Object
}

const StudentInitialState: IReduxStudentState = {
    students: []
};

const rank = (arr: any, f: any) => {
    return arr
        .map((x: any, i: any) => [x, i])
        .sort((a: any, b: any) => f(a[0], b[0]))
        .reduce((a: any, x: any, i: any, s: any) => (a[x[1]] =
            i > 0 && f(s[i - 1][0], x[0]) === 0 ? a[s[i - 1][1]] : i + 1, a), []);
}

const setStudentReducer = (
    state: IReduxStudentState = StudentInitialState,
    action: any
) => {
    switch (action.type) {
        case EReduxActionTypes.SET_STUDENT:
            const rankValue = rank(action.payload.map((item: any) => [item.ects]), (a: any, b: any) => b - a);
            return {
                ...state,
                students: rankValue.map((item: any, index: any) => ({ ...action.payload[index], rank: item })),
            };

        default:
            return state;
    }
};

export { setStudentReducer };