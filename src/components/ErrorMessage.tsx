import { makeStyles, Theme, createStyles, Grid, Typography } from "@material-ui/core";
import React, { FC } from "react";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "80%",
      "& > * + *": {
        marginTop: theme.spacing(2)
      },
      position: "fixed",
      bottom: theme.spacing(2),
      left: 0,
      right: 0,
      marginLeft: "auto",
      marginRight: "auto",
      [theme.breakpoints.down("xs")]: {
        width: "90%"
      }
    },
    container: {
      backgroundColor: theme.palette.error.light,
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      borderRadius: 4,
      color: theme.palette.primary.dark
    },
    errorIcon: {
      marginRight: theme.spacing(2)
    }
  })
);

type Props = {
  message: string;
  onClose: () => void;
};

const ErrorMessage: FC<Props> = ({ message, onClose }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root} id="error-message">
      <Collapse in={open}>
        <Grid container direction="row" justify="space-around" alignItems="center" className={classes.container}>
          <Grid container item direction="row" alignItems="center" md={10} sm={10} xs={10}>
            <ErrorOutlineIcon className={classes.errorIcon} color="error" />
            <Typography variant="body1" noWrap={true}>
              {message}
            </Typography>
          </Grid>
          <Grid container justify="flex-end" item md={2} sm={2} xs={2}>
            <IconButton
              aria-label="close"
              color="secondary"
              size="medium"
              onClick={() => {
                setOpen(false);
                onClose();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </Collapse>
    </div>
  );
};

export default ErrorMessage;
