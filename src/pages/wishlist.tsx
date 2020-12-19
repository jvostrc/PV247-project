import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React, { FC } from "react";
import TitleRow from "../components/TitleRow";

const Wishlist: FC = () => {

  document.title = "Wishlist";

  return (
    <>
      <TitleRow name={"Wishlist"} showBack={false}></TitleRow>

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

export default Wishlist;
