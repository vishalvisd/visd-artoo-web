const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expansionPane: {
    flexDirection: "column"
  }
});

export default styles;
