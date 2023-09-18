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

class Api {
    constructor(token) {
        this.path = 'https://api.react-learning.ru';
        this.token = token;
    }

    setBody(obj) {
        return JSON.stringify(obj);
    }

    setHeaders(isContentType = false, isToken = true) {
        const obj = {};
        if (isContentType) {
            obj['Content-Type'] = 'application/json';
        }
        if (isToken) {
            obj['Authorization'] = `Bearer ${this.token}`;
        }
        return obj;
    }

    checkRes(res) {
        return res.ok
            ? res.json().then((data) => console.log(data))
            : res.json().then((err) => console.log(err.message));
        // : res.json().then((res) => Promise.reject(res));
    }

    getProducts() {
        return fetch(`${this.path}/products`, {
            headers: this.setHeaders(),
        }).then((res) => this.checkRes(res));
    }
}

export default Api;
