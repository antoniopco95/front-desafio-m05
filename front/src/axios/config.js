import axios from "axios";

const registerUserFecth = axios.create({
    baseURL: "https://back-05.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default registerUserFecth;