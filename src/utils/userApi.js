class UserApi {
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

    updateProfile(body, isAvatar = false) {
        return fetch(`${this.path}/users/me${isAvatar ? '/avatar' : ''}`, {
            method: 'PATCH',
            headers: this.setHeaders(true),
            body: this.setBody(body),
        }).then((res) => this.checkRes(res));
    }
}

export default UserApi;
