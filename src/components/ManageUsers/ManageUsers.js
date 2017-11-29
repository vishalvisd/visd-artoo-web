import React, {Component} from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import styles from "./ManageUsersStyles";

class ManageUsers extends Component {
  constructor(props, context){
    super(props, context);
  }

  render(){
    return <div>Manage Users</div>;
  }
}

ManageUsers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ManageUsers);
