import { Grid, IconButton, Typography, InputBase, fade, Theme, makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SearchIcon from "@material-ui/icons/Search";

type props = {
  name: string;
  showBack: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    width: "calc(100% - 245px)",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      marginBottom: 10
    }
  },
  container: {
    marginBottom: 20,
    [theme.breakpoints.up("xs")]: {
      paddingLeft: "2%",
      paddingRight: "2%"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    [theme.breakpoints.only("xs")]: {
      width: "calc(100% - 56px)",
      float: "right"
    }
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: 34,
    [theme.breakpoints.up("xs")]: {
      width: "10ch",
      "&:focus": {
        width: "20ch"
      }
    },
    [theme.breakpoints.only("xs")]: {
      paddingLeft: theme.spacing(0)
    }
  }
}));

const TitleRow: FC<props> = ({ name, showBack }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid container justify="space-between" alignItems="center" className={classes.container}>
      <div className={classes.row}>
        {showBack ? (
          <IconButton
            color="inherit"
            onClick={() => {
              history.goBack();
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        ) : (
          ""
        )}

        <Typography variant="h1" noWrap={true}>
          {name}
        </Typography>
      </div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </Grid>
  );
};

export default TitleRow;
