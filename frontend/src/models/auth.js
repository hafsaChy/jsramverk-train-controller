import storage from "./storage";
const api_key = process.env.AUTH_API_KEY;

const auth = {
    loggedIn: async function loggedIn() {
        const token = await storage.readToken();
        const twentyFourHours = 1000 * 60 * 60 * 24;
        const notExpired = (new Date().getTime() - token.date) < twentyFourHours;

        return token && notExpired;
    },
    login: async function login(email, password) {
        const data = {
            api_key: api_key,
            email: email,
            password: password,
        };
        const response = await fetch(`https://auth.emilfolino.se/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });
        const result = await response.json();

        if (Object.prototype.hasOwnProperty.call(result, "errors")) {
            return {
                message: result.errors.title,
                description: result.errors.detail,
                type: "danger"
            };
        };

        await storage.storeToken(result.data.token);

        return {
            message: "Inloggad",
            description: result.data.message,
            type: "success"
        };
    },
    register: async function register(email, password) {
        const data = {
            api_key: api_key,
            email: email,
            password: password,
        };
        const response = await fetch(`https://auth.emilfolino.se/register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });

        return await response.json();
    },
    logout: async function logout() {
        await storage.deleteToken();
    }
};

export default auth;