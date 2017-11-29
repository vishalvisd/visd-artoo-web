import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import styles from "./SearchBoxStyles";
import TextField from "material-ui/TextField";
import Search from "material-ui-icons/Search";
import IconButton from "material-ui/IconButton";

const SearchBox = (props) => {
  const {classes} = props;
  return (
    <div>
      <IconButton
        color="contrast"
      >
        <Search className={classes.svgIcon}/>
      </IconButton>
      <TextField
        label="Search Ticket"
        type="search"
        className={classes.textField}
        margin="normal"
      />
    </div>
  );
};
SearchBox.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(SearchBox);
