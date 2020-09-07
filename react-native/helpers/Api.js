import axios from "axios";
import links from './Links';
import ObjectHelper from "./objectHelpers";


function getLocation(location) {
    return links.baseUrl + location;
}

function status(response) {
    if (response.status === 204) {
        return Promise.resolve({
            json: () => ({})
        });
    }
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response.data);
    } else {
        return Promise.reject({ statusText: response.statusText, status: response.status, responseJson: response.data });
    }
}

function errorCall(res, errorCallback) {
    if (res.response != undefined) {
        errorCallback({
            error: res.response.data.error,
            status: res.response.status,
            statusText: res.response.putstatusText
        })
    }
    else {
        errorCallback({
            error:{message: 'Facing some issue, please try after sometime'},
            status: 408,
            statusText: ''
        })
    }

}
const instance = axios.create();
instance.defaults.timeout = 15000;

let Api = {
    doGet(location, body, successCallback, errorCallback, token) {

        let url = getLocation(location) + ObjectHelper.getQueryString(body);
        let headers = {
            "Content-Type": "application/json"
        };
        if (token) {
            headers["Authorization"] = `bearer ${token}`;
        }

        instance.get(url, {
            headers, withCredentials: true,
        }).then(status)
            .then(successCallback)
            .catch(res => errorCall(res, errorCallback));
    },

    doPost(location, body, successCallback, errorCallback, token) {
        let url = getLocation(location);
        let headers = {
            "Content-Type": "application/json"
        };
        if (token) {
            headers["Authorization"] = `bearer ${token}`;
        }
        instance.post(url, JSON.stringify(body), {
            headers,
            withCredentials: true
        }).then(status)
            .then(successCallback)
            .catch(res => errorCall(res, errorCallback));
    },

}

export default Api;
