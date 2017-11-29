import {createStore, dispatcher} from "visd-redux-adapter";
import Actions from "../common/Actions.js";
import {menuConfig} from "../common/leftMenuConfig";
import moment from "moment";
import {DB_DATE_FORMAT, DATA_BASE_ROOT, AVAILABLE_STATUS} from "../common/enum";
const ROLES = {
  ADMIN: "admin",
  SUPPORT_ENGINEER: "se",
  PRODUCT_ENGINEER: "pe"
};
const DEFAULT_ROLE = ROLES.SUPPORT_ENGINEER;
console.log("menuconfig", menuConfig);
const USER_ACTION_PAGES = Object.values(menuConfig).filter(v=>v.area === "actions").map(v=>v.key);
const USER_MANAGE_PAGES = Object.values(menuConfig).filter(v=>v.area === "manage").map(v=>v.key);
const firebaseAuth = firebase.auth();
const firebaseDatabase = firebase.database();

function processStateFromDb(state, db) {
  state.tickets = db.tickets;
  state.userRoles = Object.entries(db.roles).filter(([, value]) => value.includes(state.userInfo.email)).map((r)=>r[0]);
  state.settings = db.settings;
  state.userActionPages = state.userRoles.reduce((pageSettings, role)=>{
    pageSettings.merge(state.settings[role]);
    return pageSettings;
  }, []).filter((pageKey)=>{
    return USER_ACTION_PAGES.includes(pageKey);
  });
  state.userManagePages = state.userRoles.reduce((pageSettings, role)=>{
    pageSettings.merge(state.settings[role]);
    return pageSettings;
  }, []).filter((pageKey)=>{
    return USER_MANAGE_PAGES.includes(pageKey);
  });
  state.allUsers = Object.values(db.roles).reduce((uniqueUsers, v)=>{
    uniqueUsers.merge(v);
    return uniqueUsers;
  }, []);
}

function clearFormData(obj) {
  Object.keys(obj).forEach((k)=>{
    obj[k] = "";
  });
}
var InitStore = createStore({
  INIT(state) {
    state.loggedIn = null;
    state.userInfo = null;
    state.userRoles = [];
    state.userActionPages = [];
    state.userManagePages = [];
    state.createTicketFormData = {
      title: null,
      description: null,
      assignTo: null,
      dueDate: null,
      priority: null
    };
    state.viewTicketFormData = {
      ...state.createTicketFormData,
      status: null
    };
    state.allUsers = [];
  },
  LOGIN_APP_LOAD(state){
    console.log(state);
    firebaseAuth.onAuthStateChanged(user => {
      if (user){
        dispatcher.publish(Actions.LOGIN_USER_LOGGES_IN, user);
      } else {
        dispatcher.publish(Actions.LOGIN_USER_LOGGES_OUT);
      }
    });
    firebaseDatabase.ref().child(DATA_BASE_ROOT).on("value", (cdb)=>{
      dispatcher.publish(Actions.DB_VALUE_UPDATE, cdb.val());
    });
  },
  DB_VALUE_UPDATE(state, db){
    processStateFromDb(state, db);
  },
  LOGIN_USER_LOGGES_IN(state, user){
    state.loggedIn = true;
    state.userInfo = user;
    firebaseDatabase.ref(DATA_BASE_ROOT).once("value").then((cdb)=>{
      dispatcher.publish(Actions.DB_VALUE_UPDATE, cdb.val());
    });
  },
  SETUP_USER(state, user, rolesData, allTickets){
    state.userRoles = Object.entries(rolesData).filter(([, value]) => value.includes(user.email)).map((r)=>r[0]);
    state.allTickets = allTickets;
    state.loggedIn = true;
    state.userInfo = user;
  },
  LOGIN_USER_LOGGES_OUT(state){
    state.loggedIn = false;
    state.userInfo = null;
  },
  LOGIN_SUBMIT(state, email, password){
    firebaseAuth.signInWithEmailAndPassword(email, password).then((user)=>{
      dispatcher.publish(Actions.LOGIN_USER_LOGGES_IN, user);
    }).catch((e)=>console.log(e.message));
  },
  CREATE_TICKET_FORM_MODIFY(state, field, value){
    state.createTicketFormData[field] = value;
  },
  CREATE_NEW_TICKET(state){
    let allTickets = state.tickets;
    allTickets[`AR${Object.keys(allTickets).length}`] = {
      ...state.createTicketFormData,
      status: AVAILABLE_STATUS.OPEN,
      creator: state.userInfo.email,
      creationdt: moment().format(DB_DATE_FORMAT),
    };
    clearFormData(state.createTicketFormData);
    firebaseDatabase.ref().child(DATA_BASE_ROOT).child("tickets").set(allTickets);
  },
  SHOW_EDIT_TICKET_POPUP(state, ticketId){
    if (ticketId) {
      state.editingTicketData = {
        id: ticketId,
        ...state.tickets[ticketId]
      };
      state.showEditTicketsPopup = true;
    }
  },
  EDIT_TICKET_FORM_MODIFY(state, field, value){
    state.editingTicketData[field] = value;
  },
  EDIT_TICKET_FORM_SUBMIT(state){
    let ticketId = state.editingTicketData.id;
    delete state.editingTicketData.id;
    firebaseDatabase.ref().child(DATA_BASE_ROOT).child("tickets").child(ticketId).set(state.editingTicketData);
  },
  HIDE_EDIT_TICKET_POPUP(state){
    state.editingTicketData = {};
    state.showEditTicketsPopup = false;
  }
});

export default InitStore;
