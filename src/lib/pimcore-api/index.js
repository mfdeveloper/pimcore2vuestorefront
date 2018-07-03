'use strict';
const unirest = require('unirest');

import { ApiClient } from '../api-client';

class PimcoreApiClient extends ApiClient {

    baseEndpoint = 'classes';
    client = unirest;
    availablePimcoreClassess = [];

    /**
     * Setup Pimcore Api Client
     * @param {object} config configuration with "apiKey" and "url" keys for Pimcore API endpoint
     */
    constructor(config) {
        // this.config = config
        super(config);

        if (!config.apiKey || !config.url)
            throw Error('apiKey and url are required config keys for Pimcore Api Client');
    
        this.baseUrl = `${config.url}webservice/rest/`;
        // this.apiKey = config.apiKey
        this.params.apiKey = config.apiKey;
    }

    _setupRequest(unirest) {
        return unirest.headers({'Accept': 'application/json', 'Content-Type': 'application/json'});        
    }
    // _setupUrl(endpointName) {
    //     return this.baseUrl + endpointName + '?apikey=' + this.apiKey
    // }
    post(endpointName) {
        return new Promise((resolve, reject) => {
            this._setupRequest(this.client.post(this._setupUrl(endpointName))).end((resp) => {
                if (resp.clientError || resp.serverError) {
                    return reject(resp);
                }
    
                return resolve(resp);
            });
        });
    }

    get(endpointName) {
        return new Promise((resolve, reject) => {
            this._setupRequest(this.client.get(this._setupUrl(endpointName))).end((resp) => {
                if (resp.clientError || resp.serverError) {
                    return reject(resp);
                }
    
                return resolve(resp);
            });
        });
    }

    put(endpointName) {
        return new Promise((resolve, reject) => {
            this._setupRequest(this.client.put(this._setupUrl(endpointName))).end((resp) => {
                if (resp.clientError || resp.serverError) {
                    return reject(resp);
                }
    
                return resolve(resp);
            });
        });
    }

    delete(endpointName) {
        return new Promise((resolve, reject) => {
            this._setupRequest(this.client.delete(this._setupUrl(endpointName))).end((resp) => {
                if (resp.clientError || resp.serverError) {
                    return reject(resp);
                }
    
                return resolve(resp);
            });
        });
    }

    set data(value) {
        super.data = value;
        this.availablePimcoreClassess = value;
    }
    
}
module.exports = PimcoreApiClient;