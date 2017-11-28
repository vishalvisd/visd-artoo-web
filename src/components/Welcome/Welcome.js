import React, {Component} from "react";
import styles from "./WelcomeStyles";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import mixin from "../../common/mixinCore";
import StoreLoaderMixin from "../../common/StoreLoaderMixin";

class Welcome extends Component {
  constructor(props, context){
    super(props, context);
  }

  render(){
    return <div>
      Welcome Page
    </div>;
  }
}

Welcome.propTypes = {
  classes: PropTypes.object
};

mixin(Welcome, [StoreLoaderMixin]);
export default withStyles(styles)(Welcome);
