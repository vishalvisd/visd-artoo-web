import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import styles from "./ViewTicketsStyles";
import {TextField, Select, Input} from "material-ui";
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
      disabled={props.disabledAll === true}
      className={classes.textField}
      helperText=""
      fullWidth={true}
      margin="normal">
    </TextField>
    <TextField
      value={props.data.creationdt}
      label="Creation Date"
      disabled={props.disabledAll === true}
      className={classes.textField}
      helperText=""
      fullWidth={true}
      margin="normal">
    </TextField>
    <Select
      value={props.data.status}
      disabled={props.disabledAll === true}
      fullWidth={true}
      onChange={e => dispatcher.publish(Actions.EDIT_TICKET_FORM_MODIFY, "status", e.target.value)}
      input={<Input name="assingTo"/>}
    >
      {
        Object.keys(AVAILABLE_STATUS).map((v, i1)=>{
          return <MenuItem key={i1} value={AVAILABLE_STATUS[v]}>{AVAILABLE_STATUS[v]}</MenuItem>;
        })
      }
    </Select>
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
    <Select
      value={props.data.assignTo}
      disabled={props.disabledAll === true}
      fullWidth={true}
      onChange={e => dispatcher.publish(Actions.EDIT_TICKET_FORM_MODIFY, "assignTo", e.target.value)}
      input={<Input name="assingTo"/>}
    >
      {
        props.allUsers.map((v, i1)=>{
          return <MenuItem key={i1} value={v}>{v}</MenuItem>;
        })
      }
    </Select>
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
    <Select
      value={props.data.priority}
      disabled={props.disabledAll === true}
      fullWidth={true}
      onChange={e => dispatcher.publish(Actions.EDIT_TICKET_FORM_MODIFY, "priority", e.target.value)}
      input={<Input name="priority"/>}
    >
      {
        [...Array(MAX_PRIORITY).fill("")].map((v, i1)=>{
          return <MenuItem key={i1} value={i1+1}>{i1+1}</MenuItem>;
        })
      }
    </Select>
  </div>;
};

ViewTicketsFieldsRenderer.propTypes = {
  data: PropTypes.object.isRequired,
  allUsers: PropTypes.array.isRequired,
  disabledAll: PropTypes.boolean,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewTicketsFieldsRenderer);
