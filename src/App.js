import React, { useEffect, useState } from 'react'
import { executeSearch, sortCards, getData } from './utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@material-ui/core';
import { Grid } from '@mui/material';
import { CardSearchPreview } from './components/cardSearchPreview';


export const App = () => {

    const [, setCardSets] = useState([]);
    const [allSets, setAllSets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const mdTheme = createTheme();

    useEffect(() => {
        if (searchTerm.length >= 2) {
            const searchResults = executeSearch(searchTerm, allSets);
            const sortedResults = sortCards(searchResults);
            setFilteredResults(sortedResults);
        }
    }, [searchTerm])

    useEffect(() => {
        const initGetData = async () => {
            const cardData = await getData();
            const { all, cardSetData } = cardData;
            setAllSets(all);
            setCardSets(cardSetData);
        }
        initGetData();

    }, [])

    console.log('== App Rendered ==', filteredResults.length);
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '50vw' }}>
                <CssBaseline />
                <h1>The App!</h1>
                <input value={searchTerm} type="text" placeholder="Search..." onChange={event => {
                    setSearchTerm(event.target.value);
                }}></input>
                <hr />

                <Grid container={true} spacing={2} columns={16}>
                    {filteredResults.map(card => {
                        return (
                            <Grid item={true} key={card.identifiers.mtgjsonV4Id}>
                                <CardSearchPreview key={card.identifiers.mtgjsonV4Id} cardData={card} />
                            </Grid>)
                    })}
                </Grid>
            </Box>
        </ThemeProvider>



    )
}
