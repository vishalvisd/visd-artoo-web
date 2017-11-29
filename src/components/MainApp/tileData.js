import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import CreateIcon from "material-ui-icons/AddCircle";
import ViewModuleIcon from "material-ui-icons/ViewModule";
import VerifiedUserIcon from "material-ui-icons/VerifiedUser";
import {NavLink} from "react-router-dom";

export const mailFolderListItems = (
  <div>
    <NavLink
      to="/createTicket">
      <ListItem button>
        <ListItemIcon>
          <CreateIcon />
        </ListItemIcon>
        <ListItemText primary="Create Ticket" />
      </ListItem>
    </NavLink>
    <NavLink
      to="/viewTickets">
      <ListItem button>
        <ListItemIcon>
          <ViewModuleIcon />
        </ListItemIcon>
        <ListItemText primary="View Tickets" />
      </ListItem>
    </NavLink>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <NavLink
      to="/manageUsers">
      <ListItem button>
        <ListItemIcon>
          <VerifiedUserIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Users" />
      </ListItem>
    </NavLink>
  </div>
);
