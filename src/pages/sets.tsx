/*
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import { FC } from "react";
*/
import { useLoggedInUser, db } from "../utils/firebase";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { MyCard, WishlistCard } from '../types';
/*
const Sets: FC = () => {

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color="secondary">Sets view</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={submitWishlistCard} color="primary">
              Wishlist - Test Submit
            </Button>
            <Button onClick={submitMyCard} color="primary">
              My Cards - Test Submit
            </Button>
            <Button onClick={submitNewSet} color="primary">
              New set - Test Submit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Sets;
*/

const useDb = () => {
  
  const user = useLoggedInUser();

  const wishlistCollection = db.collection('users').doc(user?.email ?? user?.uid).collection('wishlist') as firebase.firestore.CollectionReference<WishlistCard[]>;
  const myCardsCollection = db.collection('users').doc(user?.email ?? user?.uid).collection('my-cards') as firebase.firestore.CollectionReference<MyCard[]>;

  const submitWishlistCard = async (cardId: string, imageSrc: string, cardNumber: number, cardSet: string) => {
    try {
      await wishlistCollection.doc(cardSet).collection("cards").doc(cardId).set({
        cardId: cardId,
        imageSrc: imageSrc,
        cardNumber: cardNumber,
        cardSet: cardSet
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeWishlistCard = async (cardId: string, cardSet: string) => {
    try {
      await wishlistCollection.doc(cardSet).collection("cards").doc(cardId).delete();
    } catch (error) {
      console.error(error);
    }
  }
  
  const submitMyCard = async (cardId: string, imageSrc: string, cardNumber: number, cardSet: string) => {
    try {
      await myCardsCollection.doc(cardSet).collection("cards").doc(cardId).set({
        cardId: cardId,
        imageSrc: imageSrc,
        cardNumber: cardNumber,
        cardSet: cardSet
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeMyCard = async (cardId: string, cardSet: string) => {
    try {
      await myCardsCollection.doc(cardSet).collection("cards").doc(cardId).delete();
    } catch (error) {
      console.error(error);
    }
  }
  

  return { submitWishlistCard, removeWishlistCard, submitMyCard, removeMyCard}
}

export default useDb;