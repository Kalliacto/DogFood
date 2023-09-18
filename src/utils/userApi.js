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

    login(body) {}
    signUp(body) {}
    forgotPwd(body) {}
    resetPwd(body) {}
}

export default UserApi;
