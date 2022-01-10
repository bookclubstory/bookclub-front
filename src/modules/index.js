import { combineReducers } from 'redux';
import user from "~/modules/login/user";
import bookclub from "~/modules/bookclub/actionOfBookclub";
// Dashboard page (TODO:// delete)
import dashboardChartView from "~/modules/dashboard/dashboardChartView";
import actionOfDashboard from "~/modules/dashboard/actionOfDashboard";

// Global (TODO:// update)
import actionOfGlobal from "~/modules/global/actionOfGlobal";
import actionOfCode from "~/modules/global/actionOfCode";
import actionOfUser from "~/modules/global/actionOfUser";

// to combine all reducers together
const appReducer = combineReducers({
  user,
  bookclub,
  actionOfUser,
  actionOfCode,
  actionOfGlobal,
  dashboardChartView,
  actionOfDashboard,
});

const RESET_STORE = "RESET_STORE";
const RESET_DASHBOARD = "RESET_DASHBOARD";

// to reset the state of redux store
export const resetStore = () => {
  return {
    type: RESET_STORE
  }
}

export const resetDashboard = () => {
  return {
    type: RESET_DASHBOARD
  }
}

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    // reset all Reducers state
    //state = undefined;

    // exclude Login User Information
    const { user, actionOfCode, actionOfUser } = state;
    state = undefined;
    state = { user, actionOfCode, actionOfUser };
  }
  if (action.type === RESET_DASHBOARD) {
    // reset all Reducers state
    //state = undefined;

    // exclude Data source of Chart
    const { user, actionOfDashboard } = state;
    state = undefined;
    state = { user, actionOfDashboard };
  }
  return appReducer(state, action)
}

export default rootReducer;