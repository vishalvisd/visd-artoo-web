import React from "react";
import {Route} from "react-router-dom";
import CreateTicket from "../CreateTicket/CreateTicket";
import ViewTickets from "../ViewTickets/ViewTickets";
import ManageUsers from "../ManageUsers/ManageUsers";

const ContentArea = () => {
  return (
    <div>
      <Route path="/createTicket" component={CreateTicket}/>
      <Route path="/viewTickets" component={ViewTickets}/>
      <Route path="/manageUsers" component={ManageUsers}/>
    </div>
  );
};

export default ContentArea;
