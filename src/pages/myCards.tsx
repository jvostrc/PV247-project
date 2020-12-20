import React, { FC } from "react";
import SetGrid from "../components/SetGrid";
import firebase from "firebase/app";

type MyCardsProps = {
  user: firebase.User | null | undefined;
};

const MyCards: FC<MyCardsProps> = ({ user }) => {
  document.title = "My Cards";

  return <SetGrid user={user} screen={"my-cards"} />;
};

export default MyCards;
