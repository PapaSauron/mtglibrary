import React, { useEffect, useState } from 'react'


export const App = () => {

    const [cardSets, setCardSets] = useState([]);
    const [allSets, setAllSets] = useState([]);

    console.log(cardSets);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('assets/SetList.json');
            const json = await response.json();
            setCardSets(json.data);
            console.log(json.data);
            const all = [];

            for (let i = 0; i < json.data.length; i++) {
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

    return (
        <div>
            <h1>The App!</h1>
            <ul>
                {allSets.map(cardSet => {
                    return (<li key={cardSet.code}>{cardSet.name}</li>)
                })}
            </ul>
        </div>



    )
}
