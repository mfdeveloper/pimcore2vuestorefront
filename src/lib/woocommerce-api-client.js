const WooCommerceAPI = require('woocommerce-api');
import { ApiClient } from "./api-client";

export class WoocommerceApiClient extends ApiClient {

    hasSecretKey = true;

    constructor(config) {
        super(config);

        if (!config.consumerKey || !config.url)
            throw Error('consumerKey and url are required config keys for Woocomerce Api Client');
    
        this.baseUrl = `${config.url}wp-json/`;
        this.baseEndpoint = config.version || this.baseEndpoint;

        this.client = new WooCommerceAPI(config);
    }

    post(endpointName) {
        return new Promise((resolve, reject) => {
            return this.client.postAsync(endpointName).then(resolve).catch(reject);
        });
    }

    get(endpointName) {
        return new Promise((resolve, reject) => {
            this.client.get(endpointName, (err, data) => {
                debugger;
                if (err && err.errno) {
                    reject(err);
                }else if(data) {
                    const response = data.toJSON();
                    response.body = JSON.parse(response.body);
                    resolve(response);
                }
            });
        });
    }
}