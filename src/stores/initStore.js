import {createStore, dispatcher} from "visd-redux-adapter";
import Actions from "../common/Actions.js";
import {menuConfig} from "../common/leftMenuConfig";
import moment from "moment";
import {DB_DATE_FORMAT, DATA_BASE_ROOT, AVAILABLE_STATUS, ROLES} from "../common/enum";
const DEFAULT_ROLE = ROLES.SUPPORT_ENGINEER;
console.log("menuconfig", menuConfig);
const USER_ACTION_PAGES = Object.values(menuConfig).filter(v=>v.area === "actions").map(v=>v.key);
const USER_MANAGE_PAGES = Object.values(menuConfig).filter(v=>v.area === "manage").map(v=>v.key);
const firebaseAuth = firebase.auth();
const firebaseDatabase = firebase.database();
const ERROR_MESSAGE_TIMEOUT = 4000;

function processStateFromDb(state, db) {
  state.tickets = db.tickets;
  state.roles = db.roles;
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
  state.stateSetFromDb = true;
}
function getTicketId(allTickets) {
  let largestNum = 0;
  Object.keys(allTickets).forEach((k)=>{
    if (!isNaN(Number(k.substring(2)))){
      largestNum = Number(k.substring(2)) > largestNum ? Number(k.substring(2)) : largestNum;
    }
  });
  return `AR${largestNum+1}`;
}
function clearFormData(obj) {
  Object.keys(obj).forEach((k)=>{
    obj[k].value = "";
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
      title: {
        label: "Title",
        type: "text",
        value: null,
        isRequired: true
      },
      description: {
        label: "Description",
        type: "text",
        value: null,
        isRequired: true
      },
      assignTo: {
        label: "Assign To",
        type: "select",
        value: null,
        isRequired: true
      },
      dueDate: {
        label: "Due Date",
        type: "date",
        value: null,
        isRequired: false
      },
      priority: {
        label: "Priority",
        type: "select",
        value: null,
        isRequired: true
      }
    };
    state.errorConfig = {
      error: false,
      errorMessage: ""
    };
    state.allUsers = [];
    state.stateSetFromDb = false;
  },
  LOGIN_APP_LOAD(state){
    console.log(state);
    state.stateSetFromDb = false;
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
    }).catch((e)=>dispatcher.publish(Actions.SHOW_SNACK_MESSAGE, e.message));
  },
  CREATE_TICKET_FORM_MODIFY(state, field, value){
    state.createTicketFormData[field].value = value;
  },
  CREATE_NEW_TICKET(state){
    let allTickets = state.tickets;
    allTickets[getTicketId(allTickets)] = {
      title: state.createTicketFormData.title.value,
      description: state.createTicketFormData.description.value,
      assignTo: state.createTicketFormData.assignTo.value,
      dueDate: state.createTicketFormData.dueDate.value,
      priority: state.createTicketFormData.priority.value,
      status: AVAILABLE_STATUS.OPEN,
      creator: state.userInfo.email,
      creationdt: moment().format(DB_DATE_FORMAT),
    };
    firebaseDatabase.ref().child(DATA_BASE_ROOT).child("tickets").set(allTickets).then(()=>{
      clearFormData(state.createTicketFormData);
      dispatcher.publish(Actions.SHOW_SNACK_MESSAGE, "New Ticket Created!");
    }).catch((e)=>{
      dispatcher.publish(Actions.SHOW_SNACK_MESSAGE, e.message);
    });
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
    firebaseDatabase.ref().child(DATA_BASE_ROOT).child("tickets").child(ticketId).set(state.editingTicketData).then(()=>{
      dispatcher.publish(Actions.SHOW_SNACK_MESSAGE, "Changes Saved");
      dispatcher.publish(Actions.HIDE_EDIT_TICKET_POPUP);
    });
  },
  HIDE_EDIT_TICKET_POPUP(state){
    state.editingTicketData = {};
    state.showEditTicketsPopup = false;
  },
  SHOW_SNACK_MESSAGE(state, errorMessage = "An error occured", actualError){
    console.log(actualError);
    state.errorConfig = {
      error: true,
      errorMessage: errorMessage
    };
    setTimeout(function () {
      dispatcher.publish(Actions.HIDE_SNACK_MESSAGE);
    }, ERROR_MESSAGE_TIMEOUT);
  },
  HIDE_SNACK_MESSAGE(state){
    state.errorConfig = {
      error: false,
      errorMessage: ""
    };
  },
  ADD_NEW_USER(state, email, password, role){
    firebaseAuth.createUserWithEmailAndPassword(email, password).then(()=>{
      let allUserForRole = state.roles[role];
      allUserForRole.push(email);
      firebaseDatabase.ref().child(DATA_BASE_ROOT).child("roles").child(role).set(allUserForRole).then(()=>{
        dispatcher.publish(Actions.SHOW_SNACK_MESSAGE, "User Creation Successful");
      }).catch((e)=>dispatcher.publish(Actions.SHOW_SNACK_MESSAGE, e.message));
    }).catch((e)=>dispatcher.publish(Actions.SHOW_SNACK_MESSAGE, e.message));
  },
});

export default InitStore;
