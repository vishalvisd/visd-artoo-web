import {createStore, dispatcher} from "visd-redux-adapter";
import Actions from "../common/Actions.js";

var InitStore = createStore({
  INIT(state) {
    state.loggedIn = null;
    state.userInfo = null;
  },
  APP_LOAD(state){
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        dispatcher.publish(Actions.USER_LOGGES_IN, user);
      } else {
        dispatcher.publish(Actions.USER_LOGGES_OUT);
      }
    })
  },
  USER_LOGGES_IN(state, user){
    state.loggedIn = true;
    state.userInfo = user;
  },
  USER_LOGGES_OUT(state){
    state.loggedIn = false;
    state.userInfo = null;
  }
});

export default InitStore;
