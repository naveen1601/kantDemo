export default {
    getQueryString(params) {
        if(!params) {
            return "";
        }
    
        var esc = encodeURIComponent;
        return "?" + Object.keys(params)
            .map(k => esc(k) + "=" + esc(params[k]))
            .join("&");
    }
};
