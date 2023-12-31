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
            ? res.json() // : res.json().then((err) => console.log(err.message));
            : res.json().then((res) => Promise.reject(res));
    }

    getProducts() {
        return fetch(`${this.path}/products`, {
            headers: this.setHeaders(),
        }).then((res) => this.checkRes(res));
    }

    searchProducts(query) {
        return fetch(`${this.path}/products/search?query=${query}`, {
            headers: this.setHeaders(),
        }).then((res) => this.checkRes(res));
    }

    getProduct(id) {
        return fetch(`${this.path}/products/${id}`, {
            headers: this.setHeaders(),
        }).then((res) => this.checkRes(res));
    }

    addProduct(body) {
        return fetch(`${this.path}/products`, {
            method: 'POST',
            headers: this.setHeaders(true),
            body: this.setBody(body),
        }).then((res) => this.checkRes(res));
    }

    updateProduct(id, body) {
        return fetch(`${this.path}/products/${id}`, {
            method: 'PATCH',
            headers: this.setHeaders(true),
            body: this.setBody(body),
        }).then((res) => this.checkRes(res));
    }

    deleteProduct(id) {
        return fetch(`${this.path}/products/${id}`, {
            method: 'DELETE',
            headers: this.setHeaders(),
        }).then((res) => this.checkRes(res));
    }

    setLike(id, isLike) {
        return fetch(`${this.path}/products/likes/${id}`, {
            method: isLike ? 'DELETE' : 'PUT',
            headers: this.setHeaders(),
        }).then((res) => this.checkRes(res));
    }

    getAllReviews() {
        return fetch(`${this.path}/products/review`, {
            headers: this.setHeaders(),
        }).then((res) => this.checkRes(res));
    }

    getReviews(id) {
        return fetch(`${this.path}/products/review/${id}`, {
            headers: this.setHeaders(),
        }).then((res) => this.checkRes(res));
    }

    addReview(id, body) {
        return fetch(`${this.path}/products/review/${id}`, {
            method: 'POST',
            headers: this.setHeaders(true),
            body: this.setBody(body),
        }).then((res) => this.checkRes(res));
    }

    deleteReview(id, reviewId) {
        return fetch(`${this.path}/products/review/${id}/${reviewId}`, {
            method: 'DELETE',
            headers: this.setHeaders(),
        }).then((res) => this.checkRes(res));
    }

    login(body) {
        return fetch(`${this.path}/signin`, {
            method: 'POST',
            headers: this.setHeaders(true, false),
            body: this.setBody(body),
        }).then((res) => this.checkRes(res));
    }

    signup(body) {
        return fetch(`${this.path}/signup`, {
            method: 'POST',
            headers: this.setHeaders(true, false),
            body: this.setBody(body),
        }).then((res) => this.checkRes(res));
    }

    forgotPwd(body) {
        return fetch(`${this.path}/forgot-password`, {
            method: 'POST',
            headers: this.setHeaders(true, false),
            body: this.setBody(body),
        }).then((res) => this.checkRes(res));
    }

    resetPwd(body) {
        return fetch(`${this.path}/password-reset/${body.token}`, {
            method: 'PATCH',
            headers: this.setHeaders(true, false),
            body: this.setBody({ password: body.password }),
        }).then((res) => this.checkRes(res));
    }

    getAllUsers() {
        return fetch(`${this.path}/users`, {
            headers: this.setHeaders(),
        }).then((res) => this.checkRes(res));
    }

    getUser(id) {
        return fetch(`${this.path}/users/${id}`, {
            headers: this.setHeaders(),
        }).then((res) => this.checkRes(res));
    }

    // getProfile() {
    //     return fetch(`${this.path}/users/me`, {
    //         headers: this.setHeaders(),
    //     }).then((res) => this.checkRes(res));
    // }

    updateProfile(body) {
        console.log(body);
        return fetch(`${this.path}/users/me`, {
            method: 'PATCH',
            headers: this.setHeaders(true),
            body: this.setBody(body),
        }).then((res) => this.checkRes(res));
    }
    updateProfileAvatar(body) {
        return fetch(`${this.path}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.setHeaders(true),
            body: this.setBody(body),
        }).then((res) => this.checkRes(res));
    }
}

export default Api;
