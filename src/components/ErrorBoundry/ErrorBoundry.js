import React, {Component} from "react";

class ErrorBoundry extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      error: null,
      info: null,
      hasError: false
    };
  }
  componentDidCatch(error, info){
    this.setState(state => ({...state, error, errorInfo: info, hasError: true}));
  }
  componentWillReceiveProps(){
    this.setState(state=>({...state, hasError: false}));
  }
  render(){
    if (this.state.hasError) {
      return <div>Something went wrong here! {`${this.state.error}`}</div>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundry;
