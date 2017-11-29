import React, {Component} from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import styles from "./MainAppStyles";
import classNames from "classnames";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import ChevronLeftIcon from "material-ui-icons/ChevronLeft";
import ChevronRightIcon from "material-ui-icons/ChevronRight";
import AccountCircle from "material-ui-icons/AccountCircle";
import Menu, { MenuItem } from "material-ui/Menu";
import SearchBox from "../SearchBox/SearchBox";
import {Router} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import ContentArea from "../ContentArea/ContentArea";
import LeftNavMenu from "../LeftNavMenu/LeftNavMenu";

const history = createBrowserHistory();

class MainApp extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      open: true,
      anchorEl: null
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleShowUserProfile = this.handleShowUserProfile.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleRequestClose() {
    this.setState({ anchorEl: null });
  }

  handleDrawerOpen(){
    this.setState({ open: true });
  }

  handleDrawerClose(){
    this.setState({ open: true });
  }

  handleShowUserProfile(){
    console.log("todo");
  }

  handleSignout(){
    firebase.auth().signOut();
  }

  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <div className={classes.flex}>
                <SearchBox />
              </div>
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="contrast"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onRequestClose={this.handleRequestClose}
                >
                  <MenuItem onClick={this.handleShowUserProfile}>Profile</MenuItem>
                  <MenuItem onClick={this.handleSignout}>Sign Out</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
          <Router history={history}>
            <div>
              <Drawer
                type="permanent"
                classes={{
                  paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                }}
                open={this.state.open}
              >
                <div className={classes.drawerInner}>
                  <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                      {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                  </div>
                  <LeftNavMenu />
                </div>
              </Drawer>
              <main className={classes.content}>
                <ContentArea />
              </main>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

MainApp.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MainApp);
