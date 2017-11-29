import React, {Component} from "react";
import styles from "./ManageUsersStyles";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import {TextField, Paper, Button} from "material-ui";
import {MenuItem} from "material-ui/Menu";
import {dispatcher} from "visd-redux-adapter";
import Actions from "../../common/Actions.js";
import {Validation, fieldValidatorCore} from "react-validation-framework";
import validator from "validator";
import {ROLES} from "../../common/enum";

class ManageUsers extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      loginEmail: "",
      loginPassword: "",
      selectedRole: ""
    };
    this.handleNewUserAddButtonClick = this.handleNewUserAddButtonClick.bind(this);
    this.handleLoginEmailTextField = this.handleLoginEmailTextField.bind(this);
    this.handleLoginPasswordTextField = this.handleLoginPasswordTextField.bind(this);
    this.handleRoleSelectField = this.handleRoleSelectField.bind(this);
  }

  handleLoginEmailTextField(e, index, value){
    this.setState((state)=>({...state, loginEmail: value}));
  }

  handleLoginPasswordTextField(e){
    let val = e.target.value;
    this.setState((state)=>({...state, loginPassword: val}));
  }

  handleRoleSelectField(e, a, b, c){
    console.log(a, b, c);
    let val = e.target.value;
    this.setState((state)=>({...state, selectedRole: val}));
  }

  handleNewUserAddButtonClick(){
    if (fieldValidatorCore.checkGroup("manage").isValid === true){
      dispatcher.publish(Actions.ADD_NEW_USER, this.state.loginEmail, this.state.loginPassword, this.state.selectedRole);
    }
  }

  render(){
    const {classes} = this.props;
    return <Paper className={classes.paperRoot} elevation={10}>
      <h1>Manage Users</h1>
      <h3>Add New User</h3>
      <div className={classes.positionRelative}>
        <Validation
          group={"manage"}
          onChangeCallback="onChange"
          validators={[
            {
              validator: (val) => {
                return validator.isEmail(val);
              },
              errorPropValue: true,
              errorMessage: "Please enter a valid email"
            }]}>
          <TextField
            value={this.state.loginEmail}
            label="Email Address"
            className={classes.textField}
            helperText=""
            fullWidth={true}
            onChange={this.handleLoginEmailTextField}
            margin="normal">
          </TextField>
        </Validation>
        <TextField
          value={this.state.loginPassword}
          label="Password"
          className={classes.textField}
          helperText=""
          type="password"
          fullWidth={true}
          onChange={this.handleLoginPasswordTextField}
          margin="normal">
        </TextField>
        <TextField
          fullWidth={true}
          select
          label="Role"
          className={classes.textField}
          value={this.state.selectedRole}
          onChange={this.handleRoleSelectField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText=""
          margin="normal">
          {Object.keys(ROLES).map(option => (
            <MenuItem key={option} value={ROLES[option]}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Button
          raised
          dense
          className={classes.Loginbutton}
          onClick={this.handleNewUserAddButtonClick}>
          Add New User
        </Button>
      </div>
    </Paper>;
  }
}

ManageUsers.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ManageUsers);
