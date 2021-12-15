import axios from "axios";
export default class Global {
    token = '';
    static setToken = (token) => {
        this.token = token;
        if (token) {
        // Apply authorization token to every request if logged in
        axios.defaults.headers.common["authorization"] = token;
        } else {
        // Delete auth header
        delete axios.defaults.headers.common["authorization"];
        }
    }

    static getToken = () => {
        return this.token;
    };
}