// https://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=ONS&size=small&rarity=L (set Icon URL)

export const executeSearch = (searchTerm, allSets) => {
    const finalResults = [];
    allSets.forEach(cardSet => {
        if (cardSet?.cards) {
            const cardResults = cardSet.cards.filter((card) => {
                const multiverseId = card.identifiers.multiverseId;
                if (!multiverseId) {
                    return false;
                }
                return card.name.toLowerCase().includes(searchTerm.toLowerCase());
            })
            finalResults.push(cardResults);
        }
    });
    return finalResults.flat();
}

export const sortCards = (sourceList = [], field = 'name') => {
    const doSort = (a, b) => {
        if (a[field] < b[field]) {
            return -1;
        }
        if (a[field] > b[field]) {
            return 1;
        }
        return 0;
    }
    return sourceList.sort(doSort);
}

export const getData = async () => {
    const response = await fetch('assets/SetList.json');
    const json = await response.json();

    const all = [];

    for (let i = 0; i < 20; i++) {
        if (json.data) {
            const entry = json.data[i];
            const path = `assets/sets/${entry.code}.json`
            console.info('fetching', path);
            try {
                const setResponse = await fetch(path);
                const setJson = await setResponse.json();
                all.push(setJson.data);
            } catch (error) {
                console.log(error);
            }
        }
    }


    return { all, cardSetData: json.data }
}

export const getCardImageURL = (multiverseID) => {
    return `https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${multiverseID}&type=card`
}