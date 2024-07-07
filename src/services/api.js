import axios from "axios";
import { CREATE_TODO, MARK_TODO, LOGIN, REGISTER, DELETE_TODO, TODO_LIST } from "./apiConstants"; // Adjust import

export const login = async (data) => {
    return axios.post(LOGIN, data);
};

export const register = async (data) => {
    return axios.post(REGISTER, data);
};

export const createTodoApi = async (data) => {
    let token = getToken();
    console.log(token, 'token');

    return axios.post(CREATE_TODO, data, {
        headers: {
            auth: token
        }
    });
};

export const getTodoListApi = async () => {
    let token = getToken();
    console.log(token, 'token');

    return axios.get(TODO_LIST, {
        headers: {
            auth: token
        }
    });
};

export const deleteTodoApi = async (data) => {
    let token = getToken();
    console.log(token, 'token');

    return axios.post(DELETE_TODO, data, { // Use DELETE_TODO
        headers: {
            auth: token
        }
    });
};

export const markTodoApi = async (data) => {
    let token = getToken();
    console.log(token, 'token');

    return axios.post(MARK_TODO, data, { 
        headers: {
            auth: token
        }
    });
};

export function getToken() {
    let user = localStorage.getItem('user');
    if (!user) return null; // Return null if no user found
    const userObj = JSON.parse(user);
    return userObj.token;
}
