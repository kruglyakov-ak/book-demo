import DS from "ember-data";
import ENV from "book-demo/config/environment";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default DS.JSONAPIAdapter.extend({
  host: ENV.backendURL,
  session: service(),

  headers: computed(function () {
    let resultHeaders = {
      "Content-Type": "application/json",
    };

    if (this.get("session.isAuthenticated")) {
      resultHeaders[
        "Authorization"
      ] = `Bearer ${this.session.data.authenticated.token}`;
    }

    return resultHeaders;
  }).volatile(),

  buildURL(modelName, id, snapshot, requestType) {
    let url = this._super(...arguments);

    if (
      modelName === "meeting" &&
      (requestType === "query" || requestType === "findRecord")
    ) {
      url += "?_embed=reports&_limit=1";
    }
    if (modelName === "report" && requestType === "findRecord" && id) {
      url += "?_expand=speaker&_expand=book";
    }

    return url;
  },

  handleResponse(status, headers, payload) {
    const meta = {
      total: headers["x-total-count"],
    };

    payload.meta = meta;

    return this._super(status, headers, payload);
  },
});
