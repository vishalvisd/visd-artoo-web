const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: "100%",
  },
  column1: {
    flexBasis: "80%",
  },
  column2: {
    flexBasis: "20%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  expansionPane: {
    flexDirection: "column"
  }
});

export default styles;
