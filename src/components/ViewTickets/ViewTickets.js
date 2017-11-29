import React, {Component} from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import styles from "./ViewTicketsStyles";
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "material-ui/ExpansionPanel";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import mixin from "../../common/mixinCore";
import StoreLoaderMixin from "../../common/StoreLoaderMixin";
import initStore from "../../stores/initStore";
import {dispatcher} from "visd-redux-adapter";
import Actions from "../../common/Actions.js";
import {TextField, Button, Select, Input} from "material-ui";
import {MenuItem} from "material-ui/Menu";
import {MAX_PRIORITY, AVAILABLE_STATUS} from "../../common/enum";


class ViewTickets extends Component {
  constructor(props, context){
    super(props, context);
    this.store = initStore;
  }
  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1>View Tickets</h1>
        {
          this.state.tickets && Object.entries(this.state.tickets).map(([key, value], i)=>{
            return <ExpansionPanel key={i}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{key}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.expansionPane}>
                <TextField
                  value={value.creator}
                  label="Created By"
                  disabled={true}
                  className={classes.textField}
                  helperText=""
                  fullWidth={true}
                  margin="normal">
                </TextField>
                <TextField
                  value={value.creationdt}
                  label="Creation Date"
                  disabled={true}
                  className={classes.textField}
                  helperText=""
                  fullWidth={true}
                  margin="normal">
                </TextField>
                <Select
                  value={value.status}
                  fullWidth={true}
                  onChange={e => dispatcher.publish(Actions.VIEW_TICKET_FORM_MODIFY, "assignTo", e.target.value)}
                  input={<Input name="assingTo"/>}
                >
                  {
                    Object.keys(AVAILABLE_STATUS).map((v, i1)=>{
                      return <MenuItem key={i1} value={AVAILABLE_STATUS[v]}>{AVAILABLE_STATUS[v]}</MenuItem>;
                    })
                  }
                </Select>
                <TextField
                  value={value.title}
                  label="Title"
                  className={classes.textField}
                  helperText=""
                  fullWidth={true}
                  onChange={e => dispatcher.publish(Actions.VIEW_TICKET_FORM_MODIFY, "title", e.target.value)}
                  margin="normal">
                </TextField>
                <TextField
                  value={value.description}
                  label="Description"
                  className={classes.textField}
                  helperText=""
                  fullWidth={true}
                  onChange={e => dispatcher.publish(Actions.VIEW_TICKET_FORM_MODIFY, "description", e.target.value)}
                  margin="normal">
                </TextField>
                <Select
                  value={value.assignTo}
                  fullWidth={true}
                  onChange={e => dispatcher.publish(Actions.VIEW_TICKET_FORM_MODIFY, "assignTo", e.target.value)}
                  input={<Input name="assingTo"/>}
                >
                  {
                    this.state.allUsers.map((v, i1)=>{
                      return <MenuItem key={i1} value={v}>{v}</MenuItem>;
                    })
                  }
                </Select>
                <TextField
                  id="date"
                  label="Due Date"
                  fullWidth={true}
                  type="date"
                  value={value.dueDate}
                  onChange={e => dispatcher.publish(Actions.VIEW_TICKET_FORM_MODIFY, "dueDate", e.target.value)}
                  defaultValue={new Date()}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Select
                  value={value.priority}
                  fullWidth={true}
                  onChange={e => dispatcher.publish(Actions.VIEW_TICKET_FORM_MODIFY, "priority", e.target.value)}
                  input={<Input name="priority"/>}
                >
                  {
                    [...Array(MAX_PRIORITY).fill("")].map((v, i1)=>{
                      return <MenuItem key={i} value={i1+1}>{i1+1}</MenuItem>;
                    })
                  }
                </Select>
              </ExpansionPanelDetails>
            </ExpansionPanel>;
          })
        }
      </div>
    );
  }
}
ViewTickets.propTypes = {
  classes: PropTypes.object.isRequired,
};
mixin(ViewTickets, [StoreLoaderMixin]);
export default withStyles(styles)(ViewTickets);
