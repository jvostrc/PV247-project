import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React, { FC } from "react";
import TitleRow from "../components/TitleRow";

const MyCards: FC = () => {

  document.title = "My Cards";

  return (
    <>
      <TitleRow name={"My Cards"} showBack={false}></TitleRow>
      <Grid container>
        {/*data?.cards
          .sort((a: IPkmnCard, b: IPkmnCard) => a?.number - b?.number)
          .map((item: IPkmnCard) => (
            <Grid key={item.id} lg={3} md={4} sm={6} xs={12}>
              <PkmnCard card={item} />
            </Grid>
          ))*/}
      </Grid>
    </>
  );
};

export default MyCards;
