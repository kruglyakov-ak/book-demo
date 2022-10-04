import DS from "ember-data";
import ENV from "book-demo/config/environment";

export default DS.JSONAPIAdapter.extend({
  host: ENV.backendURL,

  init() {
    this._super(...arguments);
    this.set("headers", {
      "Content-Type": "application/json",
    });
  },

  buildURL(modelName, id, snapshot, requestType) {
    let url = this._super(...arguments);

    if (modelName === "meeting" && requestType === 'query') {
      url += "?_embed=reports";
    }
    if (modelName === "report"  && requestType === 'findRecord' && id) {
      url += "?_expand=speaker&_expand=book";
    }

    return url;
  },
});
