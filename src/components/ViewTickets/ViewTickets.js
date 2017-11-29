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
import {Button} from "material-ui";
import ViewTicketsFieldsRenderer from "./ViewTicketsFieldsRenderer";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "material-ui/Dialog";
import Slide from "material-ui/transitions/Slide";

function Transition(props) {
  let p = Object.assign({}, props, {timeout: 300});
  return <Slide direction="up" {...p} />;
}

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
                <div className={classes.column1}>
                  <Typography className={classes.heading}>{key}</Typography>
                </div>
                <div className={classes.column2}>
                  <div className={classes.secondaryHeading}>
                    <Button
                      raised
                      dense
                      className={classes.Loginbutton}
                      onClick={()=>dispatcher.publish(Actions.SHOW_EDIT_TICKET_POPUP, key)}>
                      Edit
                    </Button>
                  </div>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.expansionPane}>
                <ViewTicketsFieldsRenderer disabledAll={true} allUsers={this.state.allUsers} data={value}/>
              </ExpansionPanelDetails>
            </ExpansionPanel>;
          })
        }
        <Dialog
          open={this.state.showEditTicketsPopup}
          transition={Transition}
          keepMounted
        >
          <DialogTitle>{`Edit ${this.state.editingTicketData.id}`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <ViewTicketsFieldsRenderer disabledAll={false} allUsers={this.state.allUsers} data={this.state.editingTicketData}/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>dispatcher.publish(Actions.HIDE_EDIT_TICKET_POPUP)} color="secondary">
              Back
            </Button>
            <Button onClick={()=>dispatcher.publish(Actions.EDIT_TICKET_FORM_SUBMIT)} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
ViewTickets.propTypes = {
  classes: PropTypes.object.isRequired,
};
mixin(ViewTickets, [StoreLoaderMixin]);
export default withStyles(styles)(ViewTickets);
