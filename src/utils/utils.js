export const getEndings = (num, word) => {
    const res = num % 10;
    if (res === 1) {
        return ` ${word}`;
    } else if (1 < res && res < 5) {
        return ` ${word}а`;
    } else if (num >= 5 || !num) {
        return ` ${word}ов`;
    }
};

export const filterCards = (card, id) => {
    return card.filter(
        (item) => item.author._id == '622bd81b06c7d323b8ae4614' || item.author._id == id
    );
};
