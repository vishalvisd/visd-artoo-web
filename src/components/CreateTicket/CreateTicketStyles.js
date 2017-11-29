const styles = theme => ({
  positionRelative: {
    position: "relative"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  paperRoot: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: "0 auto 50px",
    marginTop: theme.spacing.unit * 3,
    width: "90%"
  }),
  Loginbutton: {
    margin: theme.spacing.unit,
  },
});

export default styles;
