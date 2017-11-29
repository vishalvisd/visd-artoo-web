import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import styles from "./ViewTicketsStyles";
import {TextField} from "material-ui";
import {MenuItem} from "material-ui/Menu";
import {dispatcher} from "visd-redux-adapter";
import Actions from "../../common/Actions.js";
import {MAX_PRIORITY, AVAILABLE_STATUS} from "../../common/enum";

const ViewTicketsFieldsRenderer = (props)=>{
  const {classes} = props;
  return <div>
    <TextField
      value={props.data.creator}
      label="Created By"
      disabled={true}
      className={classes.textField}
      helperText=""
      fullWidth={true}
      margin="normal">
    </TextField>
    <TextField
      value={props.data.creationdt}
      label="Creation Date"
      disabled={true}
      className={classes.textField}
      helperText=""
      fullWidth={true}
      margin="normal">
    </TextField>
    <TextField
      select
      fullWidth={true}
      label="Status"
      className={classes.textField}
      value={props.data.status}
      disabled={props.disabledAll === true}
      onChange={e => dispatcher.publish(Actions.EDIT_TICKET_FORM_MODIFY, "status", e.target.value)}
      SelectProps={{
        MenuProps: {
          className: classes.menu,
        },
      }}
      margin="normal"
    >
      {
        Object.keys(AVAILABLE_STATUS).map((v, i1)=>{
          return <MenuItem key={i1} value={AVAILABLE_STATUS[v]}>{AVAILABLE_STATUS[v]}</MenuItem>;
        })
      }
    </TextField>
    <TextField
      value={props.data.title}
      disabled={props.disabledAll === true}
      label="Title"
      className={classes.textField}
      helperText=""
      fullWidth={true}
      onChange={e => dispatcher.publish(Actions.EDIT_TICKET_FORM_MODIFY, "title", e.target.value)}
      margin="normal">
    </TextField>
    <TextField
      value={props.data.description}
      disabled={props.disabledAll === true}
      label="Description"
      className={classes.textField}
      helperText=""
      fullWidth={true}
      onChange={e => dispatcher.publish(Actions.EDIT_TICKET_FORM_MODIFY, "description", e.target.value)}
      margin="normal">
    </TextField>
    <TextField
      select
      fullWidth={true}
      label="Assign To"
      className={classes.textField}
      value={props.data.assignTo}
      disabled={props.disabledAll === true}
      onChange={e => dispatcher.publish(Actions.EDIT_TICKET_FORM_MODIFY, "assignTo", e.target.value)}
      SelectProps={{
        MenuProps: {
          className: classes.menu,
        },
      }}
      margin="normal"
    >
      {
        props.allUsers.map((v, i1)=>{
          return <MenuItem key={i1} value={v}>{v}</MenuItem>;
        })
      }
    </TextField>
    <TextField
      id="date"
      label="Due Date"
      disabled={props.disabledAll === true}
      fullWidth={true}
      type="date"
      value={props.data.dueDate}
      onChange={e => dispatcher.publish(Actions.EDIT_TICKET_FORM_MODIFY, "dueDate", e.target.value)}
      defaultValue={new Date()}
      className={classes.textField}
      InputLabelProps={{shrink: true}}
    />
    <TextField
      select
      fullWidth={true}
      label="Priority"
      className={classes.textField}
      value={props.data.priority}
      disabled={props.disabledAll === true}
      onChange={e => dispatcher.publish(Actions.EDIT_TICKET_FORM_MODIFY, "priority", e.target.value)}
      SelectProps={{
        MenuProps: {
          className: classes.menu,
        },
      }}
      margin="normal"
    >
      {
        [...Array(MAX_PRIORITY).fill("")].map((v, i1)=>{
          return <MenuItem key={i1} value={i1+1}>{i1+1}</MenuItem>;
        })
      }
    </TextField>
  </div>;
};

ViewTicketsFieldsRenderer.propTypes = {
  data: PropTypes.object.isRequired,
  allUsers: PropTypes.array.isRequired,
  disabledAll: PropTypes.boolean,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewTicketsFieldsRenderer);
