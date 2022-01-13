import { combineReducers } from 'redux';
import session from "@modules/user/session";
import actionOfUser from "@modules/user/actionOfUser";
import actionOfSettings from "@modules/system/actionOfSettings";
import actionOfBookclub from "@modules/bookclub/actionOfBookclub";

// to combine all reducers together
const appReducer = combineReducers({
    session,
    actionOfUser,
    actionOfSettings,
    actionOfBookclub,
});

const RESET_STORE = "RESET_STORE";

// to reset the state of redux store
export const resetStore = () => {
    return {
        type: RESET_STORE
    }
}

const rootReducer = (state: any, action: any) => {
    if (action.type === RESET_STORE) {
        // reset all Reducers state
        //state = undefined;

        // exclude Login User Information
        const { session, actionOfCode, actionOfUser } = state;
        state = undefined;
        state = { session, actionOfCode, actionOfUser };
    }

    return appReducer(state, action)
}

// React에서 사용할 수 있도록 타입을 만들어 export 해준다.
export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;