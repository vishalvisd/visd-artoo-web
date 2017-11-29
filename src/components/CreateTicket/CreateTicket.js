import React, {Component} from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import styles from "./CreateTicketStyles";
import {TextField, Paper, Button, Select, Input} from "material-ui";
import {MenuItem} from "material-ui/Menu";
import mixin from "../../common/mixinCore";
import StoreLoaderMixin from "../../common/StoreLoaderMixin";
import initStore from "../../stores/initStore";
import {dispatcher} from "visd-redux-adapter";
import Actions from "../../common/Actions.js";
import {MAX_PRIORITY} from "../../common/enum";

class CreateTicket extends Component {
  constructor(props, context){
    super(props, context);
    this.store = initStore;
  }

  render(){
    const {classes} = this.props;
    let {createTicketFormData} = this.state;
    return <div>
      <h1>Create Ticket</h1>
      <Paper className={classes.paperRoot} elevation={10}>
        <div className={classes.positionRelative}>
          <TextField
            value={createTicketFormData.title}
            label="Title"
            className={classes.textField}
            helperText=""
            fullWidth={true}
            onChange={e => dispatcher.publish(Actions.CREATE_TICKET_FORM_MODIFY, "title", e.target.value)}
            margin="normal">
          </TextField>
          <TextField
            value={createTicketFormData.description}
            label="Description"
            className={classes.textField}
            helperText=""
            fullWidth={true}
            onChange={e => dispatcher.publish(Actions.CREATE_TICKET_FORM_MODIFY, "description", e.target.value)}
            margin="normal">
          </TextField>
          <Select
            value={createTicketFormData.assignTo}
            fullWidth={true}
            onChange={e => dispatcher.publish(Actions.CREATE_TICKET_FORM_MODIFY, "assignTo", e.target.value)}
            input={<Input name="assingTo"/>}
          >
            {
              this.state.allUsers.map((v, i)=>{
                return <MenuItem key={i} value={v}>{v}</MenuItem>;
              })
            }
          </Select>
          <TextField
            id="date"
            label="Due Date"
            fullWidth={true}
            type="date"
            value={createTicketFormData.dueDate}
            onChange={e => dispatcher.publish(Actions.CREATE_TICKET_FORM_MODIFY, "dueDate", e.target.value)}
            defaultValue={new Date()}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Select
            value={createTicketFormData.priority}
            fullWidth={true}
            onChange={e => dispatcher.publish(Actions.CREATE_TICKET_FORM_MODIFY, "priority", e.target.value)}
            input={<Input name="priority"/>}
          >
            {
              [...Array(MAX_PRIORITY).fill("")].map((v, i)=>{
                return <MenuItem key={i} value={i+1}>{i+1}</MenuItem>;
              })
            }
          </Select>
          <Button
            raised
            dense
            className={classes.Loginbutton}
            onClick={()=>dispatcher.publish(Actions.CREATE_NEW_TICKET)}>
            Create New Ticket
          </Button>
        </div>
      </Paper>
    </div>;
  }
}

CreateTicket.propTypes = {
  classes: PropTypes.object.isRequired
};
mixin(CreateTicket, [StoreLoaderMixin]);
export default withStyles(styles)(CreateTicket);
