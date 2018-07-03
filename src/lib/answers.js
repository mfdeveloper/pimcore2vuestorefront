const PimcoreApiClient = require("./pimcore-api");
import { WoocommerceApiClient } from "./woocommerce-api-client";

export class Answers {
  api = {};

  validateApi(
    config = { answers: {}, currentAnswer: "", doneCallback: () => {} }
  ) {

    // TODO: Verify which selected backend, and instantiate the correct object (factory)
    if (config.answers.eCommerceBackend.toLowerCase() == "woocommerce") {

      this.api = new WoocommerceApiClient({
        url: config.answers.apiUrl,
        consumerKey: "ck_061910813b5598aabad4a8a6d6d0d84b5744e5e2",
        consumerSecret: 'xxxx',
        version: "wc/v2",
        wpAPI: true
      });

    } else {
      this.api = new PimcoreApiClient({
        url: config.answers.apiUrl,
        apiKey: config.currentAnswer
      });
    }

    if (this.api.hasSecretKey === false) {
        this.requestApi(config.answers, config.doneCallback);
    }else{
        config.doneCallback(null, true);
    }
  }

  requestApi(answers, done) {

    try {
        this.api
          .get(this.api.validationUrl)
          .then(resp => {
            debugger;
            if (resp.body.success === false) {
              done(resp.body.msg);
            } else {
              this.api.data = resp.body.data ? resp.body.data : resp.body;
              done(`The ${answers.eCommerceBackend} it's online and works!`, true);
            }
          })
          .catch(resp => {
            done(
              `Please provide valid URL and API Key for ${answers.eCommerceBackend}\n` +
                `[${answers.eCommerceBackend}] ${resp.errno}: ${resp.message}`
            );
          });
      } catch (err) {
        done(
          `Please provide valid URL and API Key for ${answers.eCommerceBackend}`
        );
      }
  }
}
