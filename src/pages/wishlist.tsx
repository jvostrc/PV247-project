import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React, { FC, useState } from "react";
import useDb from "./sets";
import firebase from 'firebase/app';
import SetGrid from "../components/SetGrid";

type WishlistProps = {
  user: firebase.User | null | undefined;
}

const Wishlist: FC<WishlistProps> = ({user}) => {
  
  document.title = "Wishlist";

  return (
    <>
      <SetGrid user={user} screen={"wishlist"}/>
    </>
  );
};

export default Wishlist;
