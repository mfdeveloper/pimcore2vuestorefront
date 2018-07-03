export class ApiClient {

    baseUrl = '';
    baseEndpoint = '';
    validationUrl = '';
    params = {};
    hasSecretKey = false;
    client = null;
    response = {
        data: {}
    };

    constructor(config) {
        this.config = config;
    }

    _setupUrl(endpointName) {
        let url = this.baseUrl + endpointName;
        if (!Array.isArray(this.params) && Object.keys(this.params).length > 0) {
            url = url + '?';
            for (const p in this.params) {
                url = url + `${p}=${this.params[p]}&`;
            }
            url.replace(/&$/,'');
        }

        return url;
    }
    
    post(endpointName) {
        return Promise.reject('You have to implement the method "post()"');
    }

    get(endpointName) {
        return Promise.reject('You have to implement the method "get()"');
    }

    put(endpointName) {
        return Promise.reject('You have to implement the method "put()"');
    }

    delete(endpointName) {
        return Promise.reject('You have to implement the method "delete()"');
    }

    set data(value) {
        this.response.data = value;
    }
}