import React, {Component} from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import styles from "./LeftNavMenuStyles";
import List from "material-ui/List";
import Divider from "material-ui/Divider";
import mixin from "../../common/mixinCore";
import StoreLoaderMixin from "../../common/StoreLoaderMixin";
import initStore from "../../stores/initStore";
import {menuConfig} from "../../common/leftMenuConfig";

import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import * as materialUiIcons from "material-ui-icons";
import {NavLink} from "react-router-dom";

function renderNavLink(pageKey, i){
  let mConfig = menuConfig[pageKey];
  return <NavLink
    key={i}
    to={mConfig.url}>
    <ListItem button>
      <ListItemIcon>
        {
          React.createElement(materialUiIcons[mConfig.icon])
        }
      </ListItemIcon>
      <ListItemText primary={mConfig.label} />
    </ListItem>
  </NavLink>;
}
class LeftNavMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.store = initStore;
  }

  render(){
    const {classes} = this.props;
    return (
      <div>
        {
          this.state.userActionPages.length > 0 ?
            <div>
              <Divider />
              <List className={classes.list}> {
                this.state.userActionPages.map(renderNavLink)
              }
              </List>
            </div> : ""
        }
        {
          this.state.userManagePages.length > 0 ?
            <div>
              <Divider />
              <List className={classes.list}> {
                this.state.userManagePages.map(renderNavLink)
              }
              </List>
            </div> : ""
        }
      </div>
    );
  }
}

LeftNavMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
mixin(LeftNavMenu, [StoreLoaderMixin]);
export default withStyles(styles)(LeftNavMenu);
