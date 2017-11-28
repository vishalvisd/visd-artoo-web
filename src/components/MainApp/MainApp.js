import React, {Component} from "react";
import styles from "./MainAppStyles";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import mixin from "../../common/mixinCore";
import StoreLoaderMixin from "../../common/StoreLoaderMixin";

class MainApp extends Component {
  constructor(props, context){
    super(props, context);
  }

  render(){
    return <div>
      Main App
    </div>
  }
}

MainApp.propTypes = {
  classes: PropTypes.object
};

mixin(MainApp, [StoreLoaderMixin]);
export default withStyles(styles)(MainApp);
