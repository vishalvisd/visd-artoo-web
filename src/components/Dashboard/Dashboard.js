import React, {Component} from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import styles from "./DashboardStyles";

class Dashboard extends Component {
  constructor(props, context){
    super(props, context);
  }

  render(){
    return <div>The Dashboard</div>;
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
