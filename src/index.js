import React, {Component} from "react";
import { render } from "react-dom";
import {MuiThemeProvider, createMuiTheme} from "material-ui/styles";
import {uipallete, uipalleteSecondary} from "./styles/theme/themeColors";
import {fieldValidatorCore} from "react-validation-framework";
import MainApp from "./Components/MainApp/MainApp";
import Login from "./components/Login/Login";
import Welcome from "./components/Welcome/Welcome";
import mixin from "./common/mixinCore";
import StoreLoaderMixin from "./common/StoreLoaderMixin";
import initStore from "./stores/initStore";
import {dispatcher} from "visd-redux-adapter";
import Actions from "./common/Actions.js";
import "./common/polyfills";

fieldValidatorCore.addSupport(
  "TextField",
  (event) => event[0].target.value,
  (callback, args) => callback(args[0], undefined, args[0].target.value),
  "error"
);

function theme(){
  return createMuiTheme({
    palette: {
      primary: uipallete,
      secondary: uipalleteSecondary,
    },
    status: {
      danger: "orange",
    },
  });
}

class App extends Component {
  constructor(props, context){
    super(props, context);
    this.store = initStore;
    dispatcher.publish(Actions.LOGIN_APP_LOAD);
  }
  renderComponent(){
    if (this.state.loggedIn === true){
      return <MainApp userInfo={this.state.userInfo}/>;
    } else if (this.state.loggedIn === false){
      return <Login/>;
    } else {
      return <Welcome />;
    }
  }
  render(){
    return (
      <MuiThemeProvider theme={theme}>{
        this.renderComponent()
      }</MuiThemeProvider>
    );
  }
}

mixin(App, [StoreLoaderMixin]);

render(<App />, document.querySelector("#approot"));
