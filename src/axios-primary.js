import axios from 'axios';

import store from './store/store.init';
import {logoutUser, updateLoading} from "./store/actions";
import {LOCALSTORAGE_TOKEN} from "./constants/global.constants";
import {getErrorMessage} from "./services/error";

const instance = axios.create({
    baseURL: 'http://localhost:3000/api'
});

/*const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
if (token)
    instance.defaults.headers.common['Authorization'] = token;*/

instance.interceptors.request.use(
    function (request) {
        // show loader
        store.dispatch(updateLoading(true));

        const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
        if (token)
            request.headers.authorization = token;

        // return request
        return request;
    }, function (error) {
        console.log(error, 'requestError');
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        // hide loader
        store.dispatch(updateLoading(false));

        // return response
        return response;
    }, function (error) {
        console.log(error, 'responseError');

        const errorMessage = getErrorMessage(error);

        // hide loader and show error
        store.dispatch(updateLoading(false, errorMessage));

        if (error && error.response && error.response.status === 401) {
            store.dispatch(logoutUser());
        }
        return Promise.reject(error);
    }
);

export default instance;
