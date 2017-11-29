import React, {Component} from "react";
import styles from "./LoginStyles";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import {TextField, Paper, Button} from "material-ui";
import {dispatcher} from "visd-redux-adapter";
import Actions from "../../common/Actions.js";

class Login extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      loginEmail: "",
      loginPassword: ""
    };
    this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
    this.handleLoginEmailTextField = this.handleLoginEmailTextField.bind(this);
    this.handleLoginPasswordTextField = this.handleLoginPasswordTextField.bind(this);
  }

  handleLoginEmailTextField(e){
    let val = e.target.value;
    this.setState((state)=>({...state, loginEmail: val}));
  }

  handleLoginPasswordTextField(e){
    let val = e.target.value;
    this.setState((state)=>({...state, loginPassword: val}));
  }

  handleLoginButtonClick(){
    dispatcher.publish(Actions.LOGIN_SUBMIT, this.state.loginEmail, this.state.loginPassword);
  }

  render(){
    const {classes} = this.props;
    return <Paper className={classes.paperRoot} elevation={10}>
      <div className={classes.positionRelative}>
        <TextField
          value={this.state.loginEmail}
          label="Email Address"
          className={classes.textField}
          helperText=""
          fullWidth={true}
          onChange={this.handleLoginEmailTextField}
          margin="normal">
        </TextField>
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
        <Button
          raised
          dense
          className={classes.Loginbutton}
          onClick={this.handleLoginButtonClick}>
          Login
        </Button>
      </div>
    </Paper>;
  }
}

Login.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Login);
