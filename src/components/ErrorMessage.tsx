import { makeStyles, Theme, createStyles, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { FC } from "react";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2)
      },
      position: "fixed",
      bottom: theme.spacing(2),
      left: "auto",
      right: "auto"
    }
  })
);

type Props = {
  message: string;
};

const ErrorMessage: FC<Props> = ({ message }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity="error"
        ></Alert>
      </Collapse>
    </div>
  );
};

export default ErrorMessage;
