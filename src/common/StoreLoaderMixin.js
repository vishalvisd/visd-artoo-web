export default class {
  componentDidMount() {
    if (this.store !== undefined) {
      this.unsub = this.store.subscribe(()=> {
        var newState = this.store.getState(true);
        this.setState(newState);
      });
    }
  }

  componentWillMount() {
    if (this.store !== undefined) {
      this.setState(state => ({...state, ...this.store.getState(false)}));
    }
  }

  componentWillUnmount() {
    if (this.store !== undefined) {
      this.unsub();
    }
  }
}
