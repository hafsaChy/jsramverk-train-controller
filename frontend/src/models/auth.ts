import Auth from "./../interfaces/auth";
import storage from "./storage";
const api_key = "feadecfe4096eac785328f9409647e69"

const auth = {
    loggedIn: async function loggedIn() {
        const token = await storage.readToken();
        const twentyFourHours = 1000 * 60 * 60 * 24;
        const notExpired = (new Date().getTime() - token.date) < twentyFourHours;

        return token && notExpired;
    },
    login: async function login(email: string, password: string) {
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
    register: async function register(Auth:Partial<Auth>) {
        const data = {
            api_key: api_key,
            email: Auth.email,
            password: Auth.password,
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
