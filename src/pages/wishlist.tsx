import React, { FC } from "react";
import firebase from "firebase/app";
import SetGrid from "../components/SetGrid";

type WishlistProps = {
  user: firebase.User | null | undefined;
};

const Wishlist: FC<WishlistProps> = ({ user }) => {
  document.title = "Wishlist";

  return <SetGrid user={user} screen={"wishlist"} />;
};

export default Wishlist;
