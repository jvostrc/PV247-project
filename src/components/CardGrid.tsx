import { Grid } from "@material-ui/core";
import React, { FC, useCallback, useEffect, useState } from "react";
import { IPkmnCard } from "../types";
import PkmnCard from "./PkmnCard";

// Fetches the set cards
const getSetCards = async (setCode: string): Promise<IPkmnCard[]> => {
    const response = await fetch(`https://api.pokemontcg.io/v1/cards?setCode=${setCode}`);
    const cards = await response.json();
    return cards;
}

type GridProps = {
    setCode: string
}

const CardGrid: FC<GridProps> = ({setCode}) => {
    
    // States to store data and for loading while cards are fetched
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>();

    // Loads the set cards
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const cards = await getSetCards(setCode);
            setData(cards);
        } finally {
            setLoading(false);
        }
    }, [setLoading, setCode]);

    // Calls the loadData() while the component is rendered
    useEffect(() => {
        loadData();
    }, [loadData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Grid container>
            {data?.cards.sort((a: IPkmnCard, b: IPkmnCard) => a?.number - b?.number).map((item: IPkmnCard) => (
                <Grid key={item.id} xl={3} lg={4} sm={6} xs={12}>
                    <PkmnCard
                        card={item}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default CardGrid;