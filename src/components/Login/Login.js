import React, {Component} from "react";
import styles from "./LoginStyles";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import mixin from "../../common/mixinCore";
import StoreLoaderMixin from "../../common/StoreLoaderMixin";
import {TextField, Paper} from "material-ui";

class Login extends Component {
  constructor(props, context){
    super(props, context);
  }

  render(){
    const {classes} = this.props;
    return <Paper className={classes.paperRoot} elevation={10}>
      <div className={classes.positionRelative}>
        <TextField
          label="Email Address"
          className={classes.textField}
          helperText=""
          fullWidth={true}
          margin="normal">
        </TextField>
        <TextField
          label="Password"
          className={classes.textField}
          helperText=""
          type="password"
          fullWidth={true}
          margin="normal">
        </TextField>
      </div>
    </Paper>
  }
}

Login.propTypes = {
  classes: PropTypes.object,
};

mixin(Login, [StoreLoaderMixin]);
export default withStyles(styles)(Login);
