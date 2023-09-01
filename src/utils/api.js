export const URL_NEWS = `https://newsapi.org/v2/everything?q=собаки&apiKey=${process.env.REACT_APP_NEWS_KEY}`;
export const URL_NEWS_LENTA = `https://newsapi.org/v2/everything?q=собаки&sources=lenta&apiKey=${process.env.REACT_APP_NEWS_KEY}`;

export const getNews = async () => {
    try {
        const res = await fetch(URL_NEWS);
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

export const getNewsLenta = async () => {
    try {
        const res = await fetch(URL_NEWS_LENTA);
        return res.json();
    } catch (err) {
        console.log(err);
    }
};
