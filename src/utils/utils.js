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
        (item) => item.author._id === '622bd81b06c7d323b8ae4614' || item.author._id === id
    );
};

export const changeEnds = (str) => {
    if (str?.trim().endsWith('шт')) {
        return 'Количество: ';
    }
    return 'Вес: ';
};

export const checkingEnd = (str) => {
    return isNaN(str) ? str : str + ' г.';
};

export const stockAvailability = (num) => {
    if (num < 5) {
        return 'Мало';
    }
    if (5 <= num <= 10) {
        return 'Не много';
    }
    if (num > 11) {
        return 'Много';
    }
};
