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

let Api = {
    doGet(location, body, successCallback, errorCallback, token) {

        let url = getLocation(location) + ObjectHelper.getQueryString(body);
        let headers = {
            "Content-Type": "application/json"
        };
        if (token) {
            headers["Authorization"] = `bearer ${token}`;
        }

        axios.get(url, {
            headers, withCredentials: true
        })
            .then(status)
            .then(successCallback)
            .catch(res => errorCallback({
                responseJson: res.response.data,
                status: res.response.status,
                statusText: res.response.putstatusText
            }));
    },

    doPost(location, body, successCallback, errorCallback, token) {
        let url = getLocation(location);
        let headers = {
            "Content-Type": "application/json"
        };
        if (token) {
            headers["Authorization"] = `bearer ${token}`;
        }
        axios.post(url, JSON.stringify(body),{
            headers,
            withCredentials: true
        }).then(status)
            .then(successCallback)
            .catch(res => errorCallback({
                error: res.response.data.error,
                status: res.response.status,
                statusText: res.response.putstatusText
            }));
    },
    
}

export default Api;
