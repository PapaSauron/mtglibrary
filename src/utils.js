export const executeSearch = (searchTerm, allSets) => {
    const finalResults = [];
    console.log(allSets[10]);
    allSets.forEach(cardSet => {
        if (cardSet?.cards) {
            const cardResults = cardSet.cards.filter((card) => {
                return card.name.toLowerCase().includes(searchTerm.toLowerCase());
            })
            console.log(cardResults.length);
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