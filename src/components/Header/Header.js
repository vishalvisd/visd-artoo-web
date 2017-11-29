import React, {Component} from "react";
import styles from "./HeaderStyles";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import AccountCircle from "material-ui-icons/AccountCircle";
import Menu, {MenuItem} from "material-ui/Menu";
import SearchBox from "../SearchBox/SearchBox";

class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      anchorEl: null
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleMenu(event){
    this.setState({ anchorEl: event.currentTarget });
  }

  handleRequestClose(){
    this.setState({ anchorEl: null });
  }
  render() {
    const {anchorEl} = this.state;
    const {classes, handleChangeRequestNavDrawer} = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={handleChangeRequestNavDrawer} className={classes.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <SearchBox />
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
                <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleRequestClose}>My account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.element,
  width: PropTypes.number,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default withStyles(styles)(Header);
