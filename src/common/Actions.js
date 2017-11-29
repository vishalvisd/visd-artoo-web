import keymirror from "keymirror";

var Actions = keymirror({
  LOGIN_APP_LOAD: null,
  LOGIN_USER_LOGGES_IN: null,
  LOGIN_USER_LOGGES_OUT: null,
  LOGIN_SUBMIT: null,
  SETUP_USER: null,
  DB_VALUE_UPDATE: null,
  CREATE_TICKET_FORM_MODIFY: null,
  CREATE_NEW_TICKET: null,
  SHOW_EDIT_TICKET_POPUP: null,
  HIDE_EDIT_TICKET_POPUP: null,
  EDIT_TICKET_FORM_MODIFY: null,
  EDIT_TICKET_FORM_SUBMIT: null
});

export default Actions;
