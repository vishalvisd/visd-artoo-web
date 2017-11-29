import React, {Component} from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import styles from "./CreateTicketStyles";
import {TextField, Paper, Button} from "material-ui";
import {MenuItem} from "material-ui/Menu";
import mixin from "../../common/mixinCore";
import StoreLoaderMixin from "../../common/StoreLoaderMixin";
import initStore from "../../stores/initStore";
import {dispatcher} from "visd-redux-adapter";
import Actions from "../../common/Actions.js";
import {MAX_PRIORITY} from "../../common/enum";
import {Validation, fieldValidatorCore} from "react-validation-framework";
import validator from "validator";

class CreateTicket extends Component {
  constructor(props, context){
    super(props, context);
    this.store = initStore;
    this.handleCreateTickectButtonClick = this.handleCreateTickectButtonClick.bind(this);
  }
  handleCreateTickectButtonClick(){
    if (fieldValidatorCore.checkGroup("createTicket").isValid === true){
      dispatcher.publish(Actions.CREATE_NEW_TICKET);
    } else {
      dispatcher.publish(Actions.SHOW_SNACK_MESSAGE, "Please correct marked errors");
    }
  }
  render(){
    const {classes} = this.props;
    let {createTicketFormData} = this.state;
    if (this.state.stateSetFromDb === true) {
      return <div>
        <h1>Create Ticket</h1>
        <Paper className={classes.paperRoot} elevation={10}>
          <div className={classes.positionRelative}>
            {
              Object.keys(createTicketFormData).map((k, j)=>{
                let v = createTicketFormData[k];
                if (v.type === "select"){
                  return <TextField
                    select
                    fullWidth={true}
                    label={v.label}
                    className={classes.textField}
                    value={v.value ? v.value : (k === "assignTo" ? this.state.allUsers[0] : 1)}
                    onChange={e => dispatcher.publish(Actions.CREATE_TICKET_FORM_MODIFY, k, e.target.value)}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal">
                    {
                      k === "assignTo" ?
                        this.state.allUsers.map((v1, i)=>{
                          return <MenuItem key={i} value={v1}>{v1}</MenuItem>;
                        }) : [...Array(MAX_PRIORITY).fill("")].map((v1, i)=>{
                          return <MenuItem key={i} value={i+1}>{i+1}</MenuItem>;
                        })
                    }
                  </TextField>;
                } else {
                  return <Validation
                    key={j}
                    group={"createTicket"}
                    onChangeCallback="onChange"
                    validators={[
                      {
                        validator: (val) => !(!val || v.isRequired && validator.isEmpty(val)),
                        errorPropValue: true,
                        errorMessage: "Please enter a value"
                      },
                      {
                        validator: (val) => {
                          if (v.testRegex) {
                            if (typeof v.testRegex.regex === "function") {
                              return v.testRegex.regex(val);
                            } else {
                              return new RegExp(v.testRegex.regex).test(val);
                            }
                          } else {
                            return true;
                          }
                        },
                        errorPropValue: true,
                        errorMessage: v.testRegex ? v.testRegex.errorMessage : ""
                      }]}>
                    <TextField
                      type={v.type === "date" ? "date" : null}
                      value={v.value}
                      className={classes.textField}
                      helperText={v.label}
                      fullWidth={true}
                      onChange={(e, t, value) => dispatcher.publish(Actions.CREATE_TICKET_FORM_MODIFY, k, value)}
                      margin="normal">
                    </TextField>
                  </Validation>;
                }
              })
            }
            <Button
              raised
              dense
              className={classes.Loginbutton}
              onClick={this.handleCreateTickectButtonClick}>
              Create New Ticket
            </Button>
          </div>
        </Paper>
      </div>;
    } else {
      return <div></div>;
    }
  }
}

CreateTicket.propTypes = {
  classes: PropTypes.object.isRequired
};
mixin(CreateTicket, [StoreLoaderMixin]);
export default withStyles(styles)(CreateTicket);
