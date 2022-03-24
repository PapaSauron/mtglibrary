import React, { useEffect, useState } from 'react'
import { executeSearch, sortCards } from './utils';

export const App = () => {

    const [cardSets, setCardSets] = useState([]);
    const [allSets, setAllSets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        if (searchTerm.length >= 2) {
            const searchResults = executeSearch(searchTerm, allSets);
            const sortedResults = sortCards(searchResults);
            setFilteredResults(sortedResults);
        }
    }, [searchTerm])

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('assets/SetList.json');
            const json = await response.json();
            setCardSets(json.data);
            console.log(json.data);
            const all = [];

            for (let i = 0; i < 20; i++) {
                if (json.data) {
                    const entry = json.data[i];
                    const path = `assets/sets/${entry.code}.json`
                    console.log('fetching', path);
                    try {
                        const setResponse = await fetch(path);
                        const setJson = await setResponse.json();
                        all.push(setJson.data);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
            setAllSets(all);
        }

        getData();
    }, [])

    console.log('== App Rendered ==', filteredResults.length);
    return (
        <div>
            <h1>The App!</h1>
            <input value={searchTerm} type="text" placeholder="Search..." onChange={event => {
                setSearchTerm(event.target.value);
            }}></input>
            <hr />

            <ul>
                {filteredResults.map(card => {
                    return (<li key={card.identifiers.mtgjsonV4Id}>{card.name}</li>)
                })}
            </ul>
        </div>



    )
}
